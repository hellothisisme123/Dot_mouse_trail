const trail_container = document.querySelector('.trail_container');

let effect_stats = {
    'place_speed': 50, //make dot every X ms
    'fade_time': 250,   //in ms
    'dot_size': 1       //in rem
}

const settings = document.querySelectorAll('.settings_menu');
settings.forEach(setting => {
    let input = setting.childNodes[5].childNodes[1]
    input.addEventListener('keypress', (e) => { //manual input value
        if (e.key == 'Enter') {
            let data_attribute = setting.getAttribute('data-setting-type') 
            eval(`
                effect_stats.${data_attribute} = ${parseFloat(e.target.value)}
            `)
            if (data_attribute == 'place_speed') { //refreshes the interval
                clearInterval(place_trail)
                place_trail = setInterval(create_dot, effect_stats.place_speed)
            }
            e.target.value = eval(`effect_stats.${data_attribute}`) //sets the input value
        }
    })

    let up_arrow = setting.childNodes[1]
    up_arrow.addEventListener('click', (e) => { //increment by 10
        let data_attribute = setting.getAttribute('data-setting-type') //data attribute
        eval(`
            effect_stats.${data_attribute}++
        `)  
        if (data_attribute == 'place_speed') { //refreshes the interval
            clearInterval(place_trail)
            place_trail = setInterval(create_dot, effect_stats.place_speed)
        }
        input.value = eval(`effect_stats.${data_attribute}`)    //sets the input value
    })

    let down_arrow = setting.childNodes[3]
    down_arrow.addEventListener('click', (e) => {
        let data_attribute = setting.getAttribute('data-setting-type')  //data attribute
        eval(`
            effect_stats.${data_attribute}--
        `)
        if (data_attribute == 'place_speed') { //refreshes the interval
            clearInterval(place_trail)
            place_trail = setInterval(create_dot, effect_stats.place_speed)
            
        }
        input.value = eval(`effect_stats.${data_attribute}`)    //sets the input value
    })

    input.value = eval(`effect_stats.${setting.getAttribute('data-setting-type')}`) //sets the input value on page load
})

let mouseTrail = { //make it one variable rather than 4
    'layerX': '0',
    'layerY': '0',
    'container_width': undefined,
    'container_height': undefined
}  

trail_container.addEventListener('mousemove', (e) => {
    mouseTrail.layerX = e.layerX    //sets x pos
    mouseTrail.layerY = e.layerY    //sets y pos
    mouseTrail.container_width = trail_container.clientWidth    //with of trail container
    mouseTrail.container_height = trail_container.clientHeight  //height of trail container
});

const create_dot = () => {  //creates a dot at mouse pos
    let dot = document.createElement('div')
    dot.style.left = `${mouseTrail.layerX / mouseTrail.container_width * 100}%` //x pos
    dot.style.top = `${mouseTrail.layerY / mouseTrail.container_height * 100}%` //y pos
    dot.style.width = `${effect_stats.dot_size}rem` //width according to settings
    dot.classList.add('dot_trail')  //default styling
    dot.style.animation = `dot_shadow_fade ${effect_stats.fade_time}ms alternate forwards linear infinite`  //animation according to settings
    trail_container.appendChild(dot)
    setTimeout(() => {  //removes the dot after time according to settings
        dot.remove()    
    }, effect_stats.fade_time);
}

let place_trail //initialized variable globally
window.onload = () => {
    if (!trail_container) return    //only if trail_container exists 
    place_trail = setInterval(create_dot, effect_stats.place_speed);    //default timeout according to settings
}