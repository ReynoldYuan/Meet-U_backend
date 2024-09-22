<template>
    <div class="container-fluid pt-4 px-4">
        <div class="row bg-light rounded  mx-0">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center mb-4">
            <!-- <h2 class="mb-4">會員檢舉清單</h2> -->
            <h2>會員檢舉清單</h2>
                <div class="ts-select">
                    <select v-model="selectedStatus">
                        <option value="">全部狀態</option>
                        <option value="P">處理中</option>
                        <option value="Y">檢舉成立</option>
                        <option value="N">檢舉不成立</option>
                    </select>
                </div>
            </div>
            <div v-if="loading" class="text-center">
                <div class="spinner-border" role="status">
                <span class="visually-hidden">載入中...</span>
                </div>
            </div>
            <div v-else-if="error" class="alert alert-danger" role="alert">
                {{ error }}
            </div>
            <div v-else class="ts-box">
                <table class="ts-table is-basic has-light">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>檢舉人</th>
                    <th>處理狀態</th>
                    <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="report in filteredReports" :key="report.reportId">
                    <td>{{ report.reportId }}</td>
                    <td>{{ report.reportUserId }}</td>
                    <td>{{ getStatusName(report.reportStatus) }}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + report.reportId" aria-expanded="false" :aria-controls="'collapse' + report.reportId">
                        詳細資訊
                        </button>
                    </td>
                    </tr>
                    <tr v-for="report in filteredReports" :key="'detail-' + report.reportId">
                    <td colspan="4" class="p-0">
                        <div class="collapse" :id="'collapse' + report.reportId">
                        <div class="card card-body">
                            <!-- <p><strong>被檢舉會員ID:</strong> {{ report.reportItemId }}</p> -->
                            <p><strong>被檢舉會員ID:</strong> 
                                <a :href="getUserProfileLink(report.reportItemId)" target="_blank">
                                    {{ report.reportItemId }}
                                </a>
                            </p>
                            <p><strong>檢舉類型:</strong> {{ report.reportType }}</p>
                            <p><strong>檢舉原因:</strong> {{ report.reportReason }}</p>
                            <div v-if="report.reportStatus === 'P'" class="ts-wrap">
                            <button @click="updateReportStatus(report.reportId, 'Y')" class="ts-button is-primary is-outlined is-circular">檢舉成立</button>
                            <button @click="updateReportStatus(report.reportId, 'N')" class="ts-button is-negative is-outlined is-circular">檢舉不成立</button>
                            </div>
                        </div>
                        </div>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';

const reports = ref([]);
const loading = ref(true);
const error = ref(null);
const selectedStatus = ref('');

onMounted(async () => {
    await fetchUserReports();
});

async function fetchUserReports() {
    try {
        loading.value = true;
        error.value = null;
        const response = await axiosapi.get('/report/list/users');
        reports.value = response.data;
        console.log("Fetched reports:", reports.value);
    } catch (err) {
        console.error("獲取會員檢舉列表失敗:", err);
        error.value = "獲取會員檢舉列表失敗，請稍後再試。";
    } finally {
        loading.value = false;
    }
}

const filteredReports = computed(() => {
    if (selectedStatus.value === '') {
        return reports.value;
    } else {
        return reports.value.filter(report => report.reportStatus === selectedStatus.value);
    }
});

function getStatusName(status) {
    const statusMap = {
        'P': '處理中',
        'Y': '檢舉成立',
        'N': '檢舉不成立'
    };
    return statusMap[status] || '未知狀態';
}

async function updateReportStatus(reportId, newStatus) {
    try {
        console.log("Updating report status:", reportId, newStatus);
        const response = await axiosapi.put('/report/updateStatus', {
        reportId: reportId,
        newStatus: newStatus
        });
        console.log("Update response:", response);
        if (response.status === 200) {
            if(newStatus === 'Y'){
                await Swal.fire('檢舉成立', '已通知活動舉辦人', 'success');
            }else{
                await Swal.fire('檢舉不成立', '已恢復活動狀態', 'success');
            }
        await fetchUserReports();
        }
    } catch (error) {
        console.error("更新檢舉狀態失敗:", error);
        await Swal.fire('錯誤', '更新檢舉狀態失敗，請稍後再試', 'error');
    }
}

const MEETVUE_BASE_URL = 'http://localhost:5173';

function getUserProfileLink(userId) {
    return `${MEETVUE_BASE_URL}/myprofile/${userId}`;
}
</script>

<style scoped>
.ts-table {
    width: 100%;
    border-collapse: collapse;
}

.ts-table th, .ts-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    background-color: rgb(234, 234, 234);
}

.ts-table th {
    background-color: rgb(234, 234, 234);
}

.card-body {
    background-color: #f9f9f9;
}

.ts-button.is-circular{
    color: blue;
}

.ts-table:is(.is-basic,.is-very-basic) :is(thead,tfoot) tr :is(th,td){
    background-color: rgb(26, 140, 206);
    color: white;
    text-align: center;
}
</style>