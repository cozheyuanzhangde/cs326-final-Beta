window.addEventListener("load", async function (){
    const res_user = await fetch(`/getsession`,{
        method: "GET"
    });
    if (!res_user.ok) {
        console.log(res_user.error);
        return;
    }
    const user = await res_user.json();

    console.log(user.passport.user);
});