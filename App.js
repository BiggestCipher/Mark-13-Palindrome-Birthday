var BDayInput =document.querySelector("#bday-input");
var CheckButton =document.querySelector("#check-button");
var Output =document.querySelector("#output");

function reverseString(str) {
    var charList =str.split("");
    var  reverseList =charList.reverse();
    var reversedString =reverseList.join("");
    return reversedString
}

function isStringPalindrome(str) {
    var reversedString =reverseString(str);
    return str === reversedString;
}

function dateString(date) {
    var dateStr ={day:"",month:"",year:""};
    if (date.day<10) {
        dateStr.day= "0"+ date.day;
    } else {
        dateStr.day= date.day.toString();
    }

    if (date.month<10) {
        dateStr.month= "0"+ date.month;
    } else {
        dateStr.month= date.month.toString();
    }

    dateStr.year=date.year.toString();
    return dateStr;
}


function dateAllFormats(date) {
    var ddmmyyyy =date.day +date.month +date.year;
    var mmddyyyy =date.month +date.day +date.year;
    var yyyymmdd =date.year +date.month +date.day;
    var ddmmyy =date.day +date.month +date.year.slice(-2);
    var mmddyy =date.month +date.day +date.year.slice(-2);
    var yymmdd =date.year.slice(-2) +date.month +date.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeDateAllFormats(date) {
    var dateFormatList =dateAllFormats(date);
    var palindromeList =[];

    for (i=0; i<dateFormatList.length; i++) {
        var result =isStringPalindrome(dateFormatList[i]);
        palindromeList.push(result);
    }
    return palindromeList;
}

function isLeapYear(year) {
    if (year % 400 ===0) return true;
    if (year % 100 ===0) return false;
    if (year % 4 ===0) return true;
    return false;
}

function getNextDate(date) {
    var day=date.day +1;
    var month=date.month;
    var year=date.year;
    var MonthDays= [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (month=== 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day=1;
                month=3;
            }
        } else {
            if (day >28) {
                day=1;
                month=3;
            }
        }
    } else {
        if (day >MonthDays[month-1]) {
            day=1;
            month++;
        }
    }
    if (month >12) {
        month=1;
        year++;
    }
    return { day: day, month: month, year: year};
}

function NextPalindromeDate(date) {
    var nextDate =getNextDate(date);
    var j=0;

    while (1) {
        j++;
        var strDate=dateString(nextDate);
        var resultList=checkPalindromeDateAllFormats(strDate);

        for (i=0; i<resultList.length; i++) {
            if (resultList[i]) {
                return [j, nextDate];
            }
        }
        nextDate =getNextDate(nextDate);
    }
}

function getPreviousDate(date) {
    var day= date.day-1;
    var month= date.month;
    var year= date.year;
    var MonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day===0) {
        month--;

        if (month===0) {
            month=12; day=31; year--;
        } else if (month===2) {
            if (isLeapYear(year)) {
                day=29;
            } else {
                day=28;
            }
        } else {
            day=MonthDays[month-1];
        }
    }
    return {
        day:day, month:month, year:year,
    };
}

function getPreviousPalindromeDate(date) {
    var previousDate=getPreviousDate(date);
    var j=0;

    while (1) {
        j++;
        var strDate=dateString(previousDate);
        var resultList=checkPalindromeDateAllFormats(strDate);

        for (i=0; i<resultList.length; i++) {
            if (resultList[i]) {
                return [j, previousDate];
            }
        }
        previousDate= getPreviousDate(previousDate);
    }
}


function clickHandler(e) {
    var bdayString =BDayInput.value;

    if (bdayString !== "") {
        var date =bdayString.split("-");
        var yyyy =date[0];
        var mm =date[1];
        var dd =date[2];

        var date ={
            day: Number(dd),
            month: Number(mm),
            year: Number(yyyy),
        };

        var strDate= dateString(date);
        var list= checkPalindromeDateAllFormats(strDate);
        isPalindrome =false;

        for (i=0; i<list.length; i++) {
            if (list[i]) {
                isPalindrome = true;
                break;
            }
        }

        if (!isPalindrome) {
            const [j1, nextDate] =NextPalindromeDate(date);
            const [j2, prevDate] =getPreviousPalindromeDate(date);

            if (j1>j2) {
                Output.innerText =`The nearest Palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, You missed by just ${j2} days.`;
            } else {
                Output.innerText =`The nearest Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, You missed by just ${j1} days.`;
            }
        } else {
            Output.innerText="Great! Your Birthday is a Palindrome.";
        }
    }
}

CheckButton.addEventListener("click", clickHandler);
