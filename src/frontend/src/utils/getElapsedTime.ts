import moment from "moment"

export default (date: string) => {
    const currentDate = moment();
    const creationDate = moment(date, 'YYYY-MM-DD'); // Assuming date format is 'YYYY-MM-DD'
    const duration = moment.duration(currentDate.diff(creationDate));
    const years = duration.years();
    const months = duration.months();
    const days = duration.days();
    
    if (years > 0) {
      return `Il y a ${years} an${years > 1 ? 's' : ''}`;
    } else if (months > 0) {
      return `Il y a ${months} mois`;
    } else {
      return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    }
  };