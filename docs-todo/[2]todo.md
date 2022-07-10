- verse study packages & hvsb/scripture folder
- PWA icon refresh
- add functions to prettier and linting
- use inline SVG for icons
- re-establish unpublished video list for admins using VITE_vimeoAuthenticatedAccessToken

Debounce

```
export function debounce(func: Function, delay: number = 1000) {
    let timer: number
    return (...args: any[]) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}
```
