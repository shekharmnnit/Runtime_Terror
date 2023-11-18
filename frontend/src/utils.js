export function convertDate(dateTimeString) {
    const dateObject = new Date(dateTimeString);
    // Extract date components
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(dateObject.getDate()).padStart(2, '0');
    // Formatted date string
    return `${day}-${month}-${year}`;
}