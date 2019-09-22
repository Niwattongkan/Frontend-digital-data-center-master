import Swal from 'sweetalert2';

export function alertEvent(text, type) {
    return Swal.fire({
        type: type,
        title: text,
        showConfirmButton: false,
        timer: 1500
    })
}

export function alertDeleteEvent() {
    return Swal.fire({
        title: 'คุณต้องการลบหรือไม่?',
        text: "หากกดตกลงข้อมูลจะถูกลบและไม่สามารถกู้คืนได้อีก!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
        confirmButtonClass: 'btn btn-primary',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
      })
}
