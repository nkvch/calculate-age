interface AgeResult {
  years: number;
  months: number;
  weeks: number;
  days: number;
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDaysInMonth(year: number, month: number): number {
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return daysInMonth[month - 1];
}

function compareDate(y1:number,m1:number,d1:number,y2:number,m2:number,d2:number):number{
  if (y1 !== y2) return y1 - y2;
  if (m1 !== m2) return m1 - m2;
  return d1 - d2;
}

function monthDiff(y1:number,m1:number,y2:number,m2:number):number{
  return (y2 - y1) * 12 + (m2 - m1);
}

export function calculateAge(startDate:string,endDate:string):AgeResult{
  let [sy,sm,sd] = startDate.split('-').map(Number);
  let [ey,em,ed] = endDate.split('-').map(Number);

  // If start > end within same calendar year, roll end into next year.
  if (compareDate(sy,sm,sd,ey,em,ed) > 0){
    if (sy === ey){
      ey += 1;
      if (em === 2 && ed === 29 && !isLeapYear(ey)) ed = 28;
    }else{
      // swap
      [sy,ey] = [ey,sy];
      [sm,em] = [em,sm];
      [sd,ed] = [ed,sd];
    }
  }

  // If dates equal
  if (sy===ey && sm===em && sd===ed){
    return {years:0,months:0,weeks:0,days:0};
  }

  let years=0, months=0, weeks=0, days=0;

  if (sd === ed){
    // Same day number: just months/years
    const totalMonths = monthDiff(sy,sm,ey,em);
    years = Math.floor(totalMonths/12);
    months = totalMonths % 12;
  }else if (sd < ed){
    // sd < ed
    const diffDays = ed - sd;
    weeks = Math.floor(diffDays/7);
    days  = diffDays % 7;

    const totalMonths = monthDiff(sy,sm,ey,em);
    years = Math.floor(totalMonths/12);
    months = totalMonths % 12;
  }else{
    // sd > ed
    // a) days to first of next month (inclusive of 1st)
    const daysInStartMonth = getDaysInMonth(sy,sm);
    let bridgeDays = daysInStartMonth - sd + 1;
    // Convert bridgeDays to weeks/days
    weeks = Math.floor(bridgeDays/7);
    days  = bridgeDays % 7;

    // determine first of next month
    let ny = sy, nm = sm+1;
    if (nm===13){ nm=1; ny+=1; }

    // b) months between first of next month and first of end month
    const totalMonthsMid = monthDiff(ny,nm,ey,em);
    years = Math.floor(totalMonthsMid/12);
    months = totalMonthsMid % 12;

    // c) days between first of end month and end date (exclusive of first)
    const spanDays = ed - 1; // from day1 to ed-1
    weeks += Math.floor(spanDays/7);
    days  += spanDays % 7;
  }

  // Normalise days -> weeks
  if (days >=7){
    weeks += Math.floor(days/7);
    days = days % 7;
  }

  return {years,months,weeks,days};
}

export type {AgeResult};