import type { IUser } from '@hvsb/types';

function convertToCSV(objArray) {
  const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str = '';

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (const index in array[i]) {
      if (line != '') line += ',';
      line += array[i][index];
    }
    str += line + '\r\n';
  }

  return str;
}

function downloadObjectAsCSV(itemsFormatted: Record<string, unknown>[], title: string) {
  const jsonObject = JSON.stringify(itemsFormatted);

  const csv = convertToCSV(jsonObject);

  const d = new Date();
  const date = d.getMonth() + 1 + '_' + d.getDate() + '_' + d.getFullYear();
  const exportedFilename = title + '_' + date + '.csv' || 'export.csv';

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    // feature detection
    // Browsers that support HTML5 download attribute
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', exportedFilename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function exportUsersAsCSV(data: IUser[], title: string) {
  const headers = {
    displayName: 'Name',
    email: 'Email',
    unsubscribed: 'Unsubscribed from Newsletters',
    manualSubscription: 'Manual Subscription',
    stripeSubscription: 'Stripe Subscription',
  };

  const itemsFormatted = [];
  data.forEach((user) => {
    itemsFormatted.push({
      displayName: (user.displayName?.replace(/,/, '')) || '',
      email: user.email || '',
      unsubscribed: (user.unsubscribe?.toDate()) || '',
      manualSubscription:
        (user.subscriptions?.basic?.manualSubscriptionEndDate?.toDate()) ||
        '',
      stripeSubscription:
        (user.subscriptions?.basic?.status) || '',
    });
  });

  itemsFormatted.unshift(headers);
  downloadObjectAsCSV(itemsFormatted, title);
}
