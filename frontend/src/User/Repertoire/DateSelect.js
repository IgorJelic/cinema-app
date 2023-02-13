
export default function DateSelect({
    onChange
}){
    const today = new Date();
    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    const dateConfigShort ={
        day:'numeric',  
        month:'short', 
    }

    const dateConfigLong ={
        day:'numeric',  
        month:'long', 
    }

    return(
        <>
            <select onChange={(e) => {onChange(e)}}>
                <option value={today}>
                    Today ({today.toLocaleString('en-GB', dateConfigShort)})
                </option>
                <option value={today.addDays(1)}>
                    Tomorrow ({today.addDays(1).toLocaleString('en-GB', dateConfigShort)})
                </option>
                <option value={today.addDays(2)}>
                    {today.addDays(2).toLocaleString('en-GB', dateConfigLong)}
                </option>
                <option value={today.addDays(3)}>
                    {today.addDays(3).toLocaleString('en-GB', dateConfigLong)}
                </option>
                <option value={today.addDays(4)}>
                    {today.addDays(4).toLocaleString('en-GB', dateConfigLong)}
                </option>
                <option value={today.addDays(5)}>
                    {today.addDays(5).toLocaleString('en-GB', dateConfigLong)}
                </option>
                <option value={today.addDays(6)}>
                    {today.addDays(6).toLocaleString('en-GB', dateConfigLong)}
                </option>
            </select>
        </>
    )
}