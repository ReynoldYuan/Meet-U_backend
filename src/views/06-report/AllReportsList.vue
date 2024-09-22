<template>
    <div class="content-wrapper">
        <div class="report-container">
            <h1 class="page-title">檢舉管理</h1>
    
            <div class="ts-box has-light">
            <div class="ts-tab">
                <button 
                v-for="tab in ['會員檢舉', '活動檢舉', '留言檢舉']" 
                :key="tab"
                @click="activeTab = tab"
                :class="['item', { 'is-active': activeTab === tab }]"
                >
                {{ tab }}
                </button>
            </div>
            <div class="ts-divider"></div>
            <div class="ts-content">
                <div class="filter-container">
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
                <div v-else class="report-list">
                <div v-for="report in filteredReports" :key="report.reportId" class="report-item">
                    <div class="report-header" @click="toggleReport(report.reportId)">
                    <span class="report-title">{{ getReportTitle(report) }}</span>
                    <span class="report-status">{{ getStatusName(report.reportStatus) }}</span>
                    </div>
                    <div v-show="expandedReports.includes(report.reportId)" class="report-content">
                    <p><strong>檢舉人:</strong> {{ report.reportUserId }}</p>
                    <p><strong>檢舉類型:</strong> {{ report.reportType }}</p>
                    <p><strong>檢舉原因:</strong> {{ report.reportReason }}</p>
                    <p v-if="activeTab === '活動檢舉' || activeTab === '留言檢舉'">
                        <strong>{{ activeTab === '活動檢舉' ? '活動ID:' : '留言所屬活動ID:' }}</strong>
                        <a :href="getActivityLink(activeTab === '活動檢舉' ? report.reportItemId : report.associatedActivityId)" target="_blank">
                        {{ activeTab === '活動檢舉' ? report.reportItemId : report.associatedActivityId }}
                        </a>
                    </p>
                    <p v-if="activeTab === '會員檢舉'">
                        <strong>被檢舉會員ID:</strong>
                        <a :href="getUserProfileLink(report.reportItemId)" target="_blank">
                        {{ report.reportItemId }}
                        </a>
                    </p>
                    <div v-if="report.reportStatus === 'P'" class="report-actions">
                        <button @click="updateReportStatus(report.reportId, 'Y')" class="ts-button is-primary is-small">檢舉成立</button>
                        <button @click="updateReportStatus(report.reportId, 'N')" class="ts-button is-negative is-small">檢舉不成立</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';

const activeTab = ref('活動檢舉');
const reports = ref([]);
const loading = ref(true);
const error = ref(null);
const selectedStatus = ref('');
const expandedReports = ref([]);

const fetchReports = async () => {
    try {
        loading.value = true;
        error.value = null;
        let endpoint = '';
        switch (activeTab.value) {
        case '活動檢舉':
            endpoint = '/report/list/activities';
            break;
        case '留言檢舉':
            endpoint = '/report/list/actComments';
            break;
        case '會員檢舉':
            endpoint = '/report/list/users';
            break;
        }
        const response = await axiosapi.get(endpoint);
        reports.value = response.data;
    } catch (err) {
        console.error(`獲取${activeTab.value}列表失敗:`, err);
        error.value = `獲取${activeTab.value}列表失敗，請稍後再試。`;
    } finally {
        loading.value = false;
    }
};

onMounted(fetchReports);

watch(activeTab, fetchReports);

const filteredReports = computed(() => {
    if (selectedStatus.value === '') {
        return reports.value;
    } else {
        return reports.value.filter(report => report.reportStatus === selectedStatus.value);
    }
});

const getStatusName = (status) => {
    const statusMap = {
        'P': '處理中',
        'Y': '檢舉成立',
        'N': '檢舉不成立'
    };
    return statusMap[status] || '未知狀態';
};

const updateReportStatus = async (reportId, newStatus) => {
    try {
        const response = await axiosapi.put('/report/updateStatus', {
        reportId: reportId,
        newStatus: newStatus
        });
        if (response.status === 200) {
        if (newStatus === 'Y') {
            await Swal.fire('檢舉成立', '已通知相關人員', 'success');
        } else {
            await Swal.fire('檢舉不成立', '已恢復原狀態', 'success');
        }
        await fetchReports();
        }
    } catch (error) {
        console.error("更新檢舉狀態失敗:", error);
        await Swal.fire('錯誤', '更新檢舉狀態失敗，請稍後再試', 'error');
    }
};

const MEETVUE_BASE_URL = 'http://localhost:5173';

const getActivityLink = (activityId) => `${MEETVUE_BASE_URL}/briefactivities/${activityId}`;
const getUserProfileLink = (userId) => `${MEETVUE_BASE_URL}/userProfile/${userId}`;

const toggleReport = (reportId) => {
    const index = expandedReports.value.indexOf(reportId);
    if (index === -1) {
        expandedReports.value.push(reportId);
    } else {
        expandedReports.value.splice(index, 1);
    }
};

const getReportTitle = (report) => {
    switch (activeTab.value) {
        case '活動檢舉':
        return `活動名稱: ${report.reportedContent}`;
        case '留言檢舉':
        return `留言內容: ${report.reportedContent.substring(0, 50)}${report.reportedContent.length > 50 ? '...' : ''}`;
        case '會員檢舉':
        return `被檢舉會員: ${report.reportItemId}`;
        default:
        return '未知檢舉';
    }
};
</script>

<style scoped>
.content-wrapper {
    padding: 20px;
    background-color: #f3f6f9;
    min-height: 100vh;
}

.report-container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.page-title {
    color: #86b817;
    font-size: 28px;
    margin-bottom: 20px;
}

.filter-container {
    margin-bottom: 20px;
}

.report-item {
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    margin-bottom: 15px;
    overflow: hidden;
}

.report-header {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    background-color: #f8f9fa;
    cursor: pointer;
}

.report-title {
    font-weight: bold;
    color: #86b817;
}

.report-status {
    color: #6c757d;
}

.report-content {
    padding: 15px;
    border-top: 1px solid #e0e0e0;
}

.report-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}

.ts-button {
    margin-left: 10px;
}

</style>