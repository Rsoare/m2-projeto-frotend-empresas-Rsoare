export function toast(text, color) {
    Toastify({
        text: text,
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'center',
        style: {
            background: color,
            width: '15rem',
            height: '3rem'
        },
        offset : { 
            y : '9rem' 
        }

    }).showToast()
}