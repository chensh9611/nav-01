const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {
        logo: 'R',
        logoType: 'text',
        url: 'https://www.runoob.com/'
    },
    {
        logo: 'd',
        logoType: 'images',
        url: 'https://developer.mozilla.org/zh-CN/'
    }
]
const smpilfyURL = (url) => {
    return url.replace("http://", "")
        .replace("https://", "")
        .replace("www.", "")
        .replace(/\/.*/, "")
}
const render = () => {
    $siteList.find('li:not(.last )').remove()
    hashMap.forEach((node,index) => {
        const $li = $(
            `<li>
                <div class="site">
                    <div class="logo">${node.logo[0]}</div>
                    <div class="link">${smpilfyURL(node.url)}</div>
                    <div class="close">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-close"></use>
                        </svg>
                   </div>
                </div>
            </li>`).insertBefore($lastLi)
        $li.on('click',(e) =>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation()
            hashMap.splice(index,1)
            render()
        })
    });
}
render()
$('.addButton')
    .on('click', (n => {
        let url = window.prompt('请输入你要添加的网址！')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({
            logo: smpilfyURL(url)[0],
            logoType: 'text',
            url: url,
        });
        render()
    }));
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
const keypress = () => {
    $(document).on('keypress', (e) => {
        const {key} = e
        for (let i = 0; i < hashMap.length; i++) {
            if (hashMap[i].logo.toLowerCase() === key) {
                window.open(hashMap[i].url)
            }
        }
    })
}
keypress()
$("input").focus(() =>{
    $(document).off()
})
$("input").blur(() =>{
    keypress()
})
$("button").click(() =>{
    setTimeout(() =>{
        $("input:text").val("");
    },10)

});