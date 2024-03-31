const fullRaschet = (element) => {
    const { name } = element.category;
    const elementName = element.element.name;
    const moneyPayStart = Number(element.money_pay_start);
    let min = element.beetwenSec / 60;

    if (element.pause_start) {
        min = element.pause_start / 60;
    }

    if (!min) {
        min = 1;
    }

    if (name == "Велосипеды" || name == "Ролики") {
        if (elementName.includes("Тандем")) {
            if (min <= 70) return 500;
            if (min > 70) {
                return Math.ceil((min - 70) / 30) * 250 + 500;
            }
        }

        if (min <= 70) return 300;
        if (min > 70) {
            const summ = Math.ceil((min - 70) / 30) * 100 + 300;
            const time18 = Date.parse(`${element.date_start} 18:05:00`);
            const time24 = Date.parse(`${element.date_start} 23:59:59`);

            if (summ <= 700) {
                return summ;
            } else if (summ > 700 && element.now < time18) {
                return 700;
            } else if (summ > 700 && element.now < time24) {
                if (summ < 1000) {
                    return summ;
                } else {
                    return 1000;
                }
            } else if (min <= 1440) {
                return 1000;
            } else {
                return 2000;
            }
        }
    } else if (name == "Машинки" || name == "Гироскутеры") {
        if (min <= 11) {
            return 200;
        } else {
            return Math.ceil((min - 11) / 10) * 100 + 200;
        }
    } else if (name == "Самокаты") {
        if (min <= 11) return 200;
        if (min > 11 && min <= 35) return 300;
        if (min > 35 && min <= 65) return 500;
        if (min > 65 && min <= 95) return 700;
        if (min > 95 && min <= 125) return 1000;
        if (min > 125 && min <= 155) return 1300;
        if (min > 155 && min <= 185) return 1500;
        if (min > 185 && min <= 215) return 1800;
        if (min > 215 && min <= 245) return 2000;
        if (min > 245 && min <= 275) return 2300;
        if (min > 275 && min <= 305) return 2500;
        if (min > 305) return 2700;
    } else if (name == "Картинг") {
        if (min <= 13) return 300;
        if (min > 13 && min <= 23) return 600;
        if (min > 23 && min <= 33) return 700;
        if (min > 33 && min <= 43) return 1000;
        if (min > 43 && min <= 53) return 1300;
        if (min > 53 && min <= 63) return 1400;
        if (min > 63 && min <= 73) return 1700;
        if (min > 73 && min <= 83) return 2000;
        if (min > 83 && min <= 93) return 2100;
        if (min > 93 && min <= 103) return 2400;
        if (min > 103 && min <= 113) return 2500;
        if (min > 113 && min <= 123) return 2800;
        if (min > 123 && min <= 133) return 2900;
        if (min > 133 && min <= 143) return 3000;
    } else if (name == "Защита") {
        return 0;
    }
};
export default fullRaschet;
