export const formatArabicNumber = (num: number): string => {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('');
};

export const formatMatchTime = (minutes: number): string => {
  return `الدقيقة ${formatArabicNumber(minutes)}`;
};

export const formatScore = (homeScore: number, awayScore: number): string => {
  return `${formatArabicNumber(awayScore)} - ${formatArabicNumber(homeScore)}`;
};

export const formatMatchDate = (date: Date): string => {
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'اليوم';
  } else if (diffDays === 1) {
    return 'غداً';
  } else {
    const arabicMonths = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    
    return `${formatArabicNumber(date.getDate())} ${arabicMonths[date.getMonth()]}`;
  }
};

export const getMatchStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'live': 'مباشر',
    'upcoming': 'قادم',
    'finished': 'انتهت'
  };
  
  return statusMap[status] || status;
};
