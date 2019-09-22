export function mapPersons(personList) {
    personList.map(data => {
        let title = data.TitleNameTh == 1 ? 'นาย' : data.TitleNameTh == 2 ? 'นางสาว' : 'นาง'
        let first = data.FristNameTh
        let last = data.LastNameTh
        data.FullnameTh = first && last ? title + first + ' ' + last : ''
        let titleEn = data.TitleNameEn == 1 ? 'Mr.' : data.TitleNameEn == 2 ? 'Mrs.' : 'Miss.'
        let firstEn = data.FristNameEn
        let lastEn = data.LastNameEn
        data.FullnameEn = firstEn && lastEn ? titleEn + firstEn + ' ' + lastEn : ''
    });
    return personList
}

export function createdNamePersons(personList, id) {
    let result = personList.find(data => {
        return data.PersonId == id
    })
    return result.FullnameTh
}

function showAddress(value) {
    let Building = value.Building ? "อาคาร " + value.Building + " " : ""
    let Floor = value.Floor ? "ชั้น " + value.Floor + " " : ""
    let HouseNo = value.HouseNo ? "เลขที่ " + value.HouseNo + " " : ""
    let Road = value.Road ? "ถนน " + value.Road + " " : ""
    let Soi = value.Soi ? "ซอย " + value.Soi + " " : ""
    let Subdistrict = value.Subdistrict ? "ตำบล/แขวง " + value.Subdistrict + " " : ""
    let District = value.District ? "อำเภอ/เขต " + value.District + " " : ""
    return Building + Floor + HouseNo + Road + Soi + Subdistrict + District
}