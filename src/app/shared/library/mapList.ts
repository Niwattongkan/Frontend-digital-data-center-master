export function mapPersons(personList) {
    personList.map(data => {
        const title = data.TitleNameTh == 1 ? 'นาย' : data.TitleNameTh == 2 ? 'นางสาว' : 'นาง';
        const first = data.FristNameTh;
        const last = data.LastNameTh;
        data.FullnameTh = first && last ? title + first + ' ' + last : '';
        const titleEn = data.TitleNameEn == 1 ? 'Mr.' : data.TitleNameEn == 2 ? 'Mrs.' : 'Miss.';
        const firstEn = data.FristNameEn;
        const lastEn = data.LastNameEn;
        data.FullnameEn = firstEn && lastEn ? titleEn + firstEn + ' ' + lastEn : '';
    });
    return personList;
}

export function createdNamePersons(personList, id) {
    const result = personList.find(data => {
        return data.PersonId == id;
    });
    return result.FullnameTh;
}

function showAddress(value) {
    const Building = value.Building ? 'อาคาร ' + value.Building + ' ' : '';
    const Floor = value.Floor ? 'ชั้น ' + value.Floor + ' ' : '';
    const HouseNo = value.HouseNo ? 'เลขที่ ' + value.HouseNo + ' ' : '';
    const Road = value.Road ? 'ถนน ' + value.Road + ' ' : '';
    const Soi = value.Soi ? 'ซอย ' + value.Soi + ' ' : '';
    const Subdistrict = value.Subdistrict ? 'ตำบล/แขวง ' + value.Subdistrict + ' ' : '';
    const District = value.District ? 'อำเภอ/เขต ' + value.District + ' ' : '';
    return Building + Floor + HouseNo + Road + Soi + Subdistrict + District;
}
