'use strict';

const sidebarContentSelect = document.getElementById('sidebar-content');
const showPageActionCheckbox = document.getElementById('show-page-action');

// save the selected options to storage
function saveOptions() {
    browser.storage.local.set({
        sidebarContent: sidebarContentSelect.value,
        showPageAction: showPageActionCheckbox.checked
    });
}

// update the ui with the saved values
function updateUI(res) {
    sidebarContentSelect.value = res.sidebarContent || 'tasks';
    showPageActionCheckbox.checked = res.showPageAction !== false; // default to true if not set
}

// get the stored options when the options page loads
function restoreOptions() {
    browser.storage.local.get(['sidebarContent', 'showPageAction'])
        .then(updateUI)
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}

// handle changes to the controls
sidebarContentSelect.addEventListener('change', saveOptions);
showPageActionCheckbox.addEventListener('change', saveOptions);

// restore options when the options page loads
document.addEventListener('DOMContentLoaded', restoreOptions);