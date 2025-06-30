const list = document.querySelector('.notifications-list');
const count = document.querySelector('.count');
const markRead = document.querySelector('.mark-read');
const notification = document.querySelectorAll('.notification');

list.addEventListener('click', (e) => {
  const notification = e.target.closest('.notification');
  markAsRead(notification);
  updateUnreadCount();
});

markRead.addEventListener('click', () => {
  notification.forEach((n) => {
    markAsRead(n);
    updateUnreadCount();
  });
});

function updateUnreadCount() {
  const unread = document.querySelectorAll('.notification.unread');
  count.textContent = unread.length;
}

function markAsRead(notificationElement) {
  if (notificationElement.classList.contains('unread')) {
    notificationElement.classList.remove('unread');
    const dot = notificationElement.querySelector('.dot');
    if (dot) dot.remove();
  }
}
