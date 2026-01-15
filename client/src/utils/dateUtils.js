import { format, parseISO, isValid } from 'date-fns';

export const formatDateForInput = (date) => {
    if (!date) return '';

    try {
        // If it's already a string in the correct format, return it
        if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return date;
        }

        // Parse ISO string or use Date object
        const dateObj = typeof date === 'string' ? parseISO(date) : date;

        // Check if valid date
        if (!isValid(dateObj)) {
            return '';
        }

        return format(dateObj, 'yyyy-MM-dd');
    } catch (error) {
        console.error('Error formatting date:', error);
        return '';
    }
};


export const getTodayDate = () => {
    return format(new Date(), 'yyyy-MM-dd');
};


export const formatDateForDisplay = (date) => {
    if (!date) return 'No due date';

    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;

        if (!isValid(dateObj)) {
            return 'Invalid date';
        }

        return format(dateObj, 'dd-MM-yyyy');
    } catch (error) {
        console.error('Error formatting date for display:', error);
        return 'Invalid date';
    }
};


export const isBeforeToday = (date) => {
    if (!date) return false;

    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day

        const compareDate = new Date(dateObj);
        compareDate.setHours(0, 0, 0, 0);

        return compareDate < today;
    } catch (error) {
        console.error('Error comparing dates:', error);
        return false;
    }
};


export const isOnOrAfterToday = (date) => {
    if (!date) return false;

    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const compareDate = new Date(dateObj);
        compareDate.setHours(0, 0, 0, 0);

        return compareDate >= today;
    } catch (error) {
        console.error('Error comparing dates:', error);
        return false;
    }
};
