export default function swDev() {
    let serviceWorkerURL = `${process.env.PUBLIC_URL}/sw.js`
    
    navigator.serviceWorker.register(serviceWorkerURL).then((response) => {
       
    })

}