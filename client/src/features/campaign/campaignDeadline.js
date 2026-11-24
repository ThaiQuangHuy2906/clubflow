const campaignMinute = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium', timeStyle: 'short', timeZone: 'Etc/GMT-7'
});

export function formatCampaignDeadline(value) {
  const [, seconds, digits = ''] = /T\d{2}:\d{2}:(\d{2})(?:\.(\d+))?/.exec(value);
  const fraction = digits.replace(/0+$/, '');
  const decimal = fraction ? '.' + fraction : '';
  const subminute = seconds !== '00' || fraction ? ':' + seconds + decimal : '';
  const text = campaignMinute.format(new Date(value)) + subminute + ' (UTC+7)';
  // HTML time accepts up to three fractional digits. Keep finer instants exact in a data element.
  const dateTime = fraction.length <= 3 ? value.replace(/\.\d+/, decimal) : null;
  return { text, dateTime };
}
