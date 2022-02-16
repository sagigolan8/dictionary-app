import Swal from 'sweetalert2'

export const niceAlert =  (title, timer = 2000, icon = 'error') => Swal.fire({
    position: 'center',
    icon,
    title,
    showConfirmButton: false,
    timer
  })