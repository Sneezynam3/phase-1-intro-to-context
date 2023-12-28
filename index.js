// Your code here
function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
}


function createEmployeeRecords(arr) {
// create an empty array to store the employee records
let employeeRecords = [];
  
// iterate over each nested array
for (let employeeArray of arr) {
    // call createEmployeeRecord function for each nested array
    let employeeRecord = createEmployeeRecord(employeeArray);
    // accumulate the employee record into the array
    employeeRecords.push(employeeRecord);
    }  
// return the array of employee records
return employeeRecords;
}


function createTimeInEvent(employeeRecords, date) {
    const dateArray = date.split(" ");
    const formattedDate = dateArray[0];
    const formattedTime = dateArray[1];
    const timeInEvent = {
      type: "TimeIn",
      date: formattedDate,
      hour: parseInt(formattedTime.split(":")[0])
    };
  
    employeeRecords.timeInEvents.push(timeInEvent);
  
    return employeeRecords;
}
  
function createTimeOutEvent(employeeRecords, date) {
    const dateArray = date.split(" ");
    const formattedDate = dateArray[0];
    const formattedTime = dateArray[1];
    const timeOutEvent = {
      type: "TimeOut",
      date: formattedDate,
      hour: parseInt(formattedTime.split(":")[0])
    };
  
    employeeRecords.timeOutEvents.push(timeOutEvent);
  
    return employeeRecords;
}




// In this code, we first extract the formatted date from the given date parameter. Then, we use the find method to search for the timeInEvent and timeOutEvent objects that match the provided date.

// If both the time-in and time-out events are found, we calculate the number of hours worked by subtracting the time-in hour from the time-out hour and dividing by 100 (since the hour is in a 24-hour format). The resulting value is returned as the number of hours worked on that date.

// If either the time-in or time-out event is missing, we return 0 to indicate that no hours were worked on that date.

// Make sure you have the timeInEvents and timeOutEvents arrays inside the employeeRecords object to store the corresponding events.

function hoursWorkedOnDate(employeeRecords, date) {
    const formattedDate = date.split(" ")[0];
  
    const timeInEvent = employeeRecords.timeInEvents.find(event => event.date === formattedDate);
    const timeOutEvent = employeeRecords.timeOutEvents.find(event => event.date === formattedDate);
  
    if (timeInEvent && timeOutEvent) {
      const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
      return hoursWorked;
    }
  
    return 0;
  }



function wagesEarnedOnDate (employeeRecords, date) {
    const formattedDate = date.split(" ")[0];
  
    const timeInEvent = employeeRecords.timeInEvents.find(event => event.date === formattedDate);
    const timeOutEvent = employeeRecords.timeOutEvents.find(event => event.date === formattedDate);

    if (timeInEvent && timeOutEvent) {
        const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
        return hoursWorked * employeeRecords.payPerHour;
      }
    
    return 0;
  }




function allWagesFor(employeeRecords) {
  const datesWorked = employeeRecords.timeInEvents.map(event => event.date);

  const totalWages = datesWorked.reduce((total, date) => {
    const formattedDate = date.split(" ")[0];
    const timeInEvent = employeeRecords.timeInEvents.find(event => event.date === formattedDate);
    const timeOutEvent = employeeRecords.timeOutEvents.find(event => event.date === formattedDate);

    if (timeInEvent && timeOutEvent) {
      const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
      const wagesEarned = hoursWorked * employeeRecords.payPerHour;
      return total + wagesEarned;
    }

    return total;
  }, 0);

  return totalWages;
}



function calculatePayroll(employeeRecords) {
    const datesWorked = employeeRecords.timeInEvents.map(event => event.date);
    
    const totalWages = datesWorked.reduce((total, date) => {
      const formattedDate = date.split(" ")[0];
      const timeInEvent = employeeRecords.timeInEvents.find(event => event.date === formattedDate);
      const timeOutEvent = employeeRecords.timeOutEvents.find(event => event.date === formattedDate);
  
      if (timeInEvent && timeOutEvent) {
        const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
        const wagesEarned = hoursWorked * employeeRecords.payPerHour;
        return total + wagesEarned;
      }
  
      return total;
    }, 0);
    return totalWages;
}
