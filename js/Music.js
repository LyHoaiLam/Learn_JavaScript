const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')// Lắng nghe sự kiện Button Next
const prevBtn = $('.btn-prev')// Lắng nghe sự kiện Button Prev
const randomBtn = $('.btn-random')//Lằng nghe sự kiện Button Random
const repeatBtn = $('.btn-repeat')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
songs: [
        {
            name: "Suyết Nữa Thì",
            singer: "Andiez",
            path: "/mp3/suytnuathi.mp3",
            image: "https://i.ytimg.com/vi/cUmpJ2zwfVU/maxresdefault.jpg"
        }, 
        {
            name: 'Anh Mệt Rồi',
            singer: 'Anh Mệt Rồi',
            path: '/mp3/AnhMetRoi.mp3',
            image: 'https://i.ytimg.com/vi/677bAENZAEI/maxresdefault.jpg'
        },
        {
            name: 'Ghé Qua',
            singer: 'taynguyensound',
            path: '/mp3/ghequa.mp3',
            image: 'https://i1.sndcdn.com/artworks-000392894949-deiw9h-t500x500.jpg'
        },
        {
            name: 'Đường Tôi Chở Em Về',
            singer: 'buitruonglinh',
            path: '/mp3/duongtoichoemve.mp3',
            image: 'https://i.ytimg.com/vi/OuNo8Tkb3lI/maxresdefault.jpg'
        },
        {
            name: 'Chờ đợi có đáng sợ',
            singer: 'Andiez',
            path: '/mp3/chodoicodangso.mp3',
            image: 'https://i.ytimg.com/vi/WE05tPmCj8k/maxresdefault.jpg'
        },
        {
            name: 'Chúng Ta Của Hiện Tại- lofi',
            singer: 'MTP x CM1X',
            path: '/mp3/ChungTaCuaHienTai.mp3',
            image: 'https://media.vov.vn/sites/default/files/styles/large/public/2021-02/chungtacuahientai.jpg'
        },
        {
            name: 'Như Anh Đã Thấy Em',
            singer: 'Phúc XP x Freak ',
            path: '/mp3/NhuAnhDaThayEm.mp3',
            image: 'https://i.ytimg.com/vi/cPbp2iFaZRo/maxresdefault.jpg'
        },
        {
            name: 'Legends Never Die',
            singer: 'Against The Curent-World 2017',
            path: '/mp3/LegendsNeverDie.mp3',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTALZyp2BzDPy8xhRUJhGE3M8t-DnaUGCi4QYBUGpQP5eqsuV4arLJ9IUftyM-n5rZ0TFI&usqp=CAU'
        },
    ],
    render: function(){// render ra view
        // Chọc lên thg Array
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `
        })
        // playlist không lặp lại nên không cần tạo biến biên ngoài
        $('.playlist').innerHTML = htmls.join('')
    // const content = element.innerHTML;
    },

    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvent: function(){
        const _this = this
        const cdWidth = cd.offsetWidth



        // Xử lý CD quay và dừng
        //cdThumb.animate([
        const cdThumbAnimate = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000, // 10 seconds (Tốc độ quay của đĩa)
            iterations: Infinity// vô hạn (Không có thì đĩa sẽ quay đến một điểm nào đó thì đúng im luôn)
        })
        cdThumbAnimate.pause()//(Tạo biến cdThumbAnimate gán nó ) Để vửa run Project đĩa không quaym khi ấn Icon Play phát nhạc thì mới quay

        // Xử lý phóng to / thu nhỏ CD
        document.onscroll = function(){//Kéo Scroll
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
            // console.log(newCdWidth)
            // console.log(document.documentElement.scrollTop)
        }

        //Xử Lý Khi Click Play
        playBtn.onclick = function(){
            if(_this.isPlaying){
                // _this.isPlaying = false
                audio.pause()
                // player.classList.remove('playing')
            }else{
                // _this.isPlaying = true
                audio.play()
                // player.classList.add('playing')
            }
            console.log("cdThumbAnimate: ", cdThumbAnimate)
        }


        //Khi bài hát đc play
        audio.onplay = function(){
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        
        //Khi bài hát bị pause
        audio.onpause = function(){
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }


        //Khi tiến độ bài hát thay đổi thì thanh trạng thái thay đổi theo nhịp độ bài hát
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }


        // Xử lý khi tua bài hát.
        progress.onchange = function(e){
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }
        //Khi nprev bài hát phía sau.
        prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                _this.prevSong()
            }
            // _this.prevSong()
            audio.play()
        }
        //Khi next bài hát tiếp theo.
        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                _this.nextSong()
            }
            // _this.nextSong()
            audio.play()
        }
        //Xử lý random và Tắt Random
        randomBtn.onclick = function(){
            _this.isRandom = !_this.isRandom //Đào ngược lại chính nó
            randomBtn.classList.toggle('active', _this.isRandom)//Đối số 2 là boolean, boolean là true thì add class vào và ngược lại (remove)
            _this.playRandomSong()
        }
        // Xử lý lập lại bài hát
        repeatBtn.onclick = function(e){
            _this.isRepeat = !_this.isRepeat //Đào ngược lại chính nó
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }
        //Xử lý next sau khi audio ended. (Sự kiện của bài hát khi nó kết khúc)
        audio.onended = function(){
            // console.log(123)
            // _this.nextSong()
            // audio.play()
            if(_this.isRepeat){
                audio.play()
            }else{
                nextBtn.click()
            }
        }
    },

    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
        // console.log(heading, cdThumb, audio)
    },
    prevSong: function(){
        // Đến cuối bài hát thì quay về bài đầu tiên
        this.currentIndex --
        if(this.currentIndex < 0){
            this.currentIndex =  this.songs.length - 1
        }
        this.loadCurrentSong()// Ấn button Prev thì tải qua bài phía sau
    },

    nextSong: function(){
        this.currentIndex ++
        //Đến cuối bài hát thì quay nó về bài đầu tiên :)).
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()// Ấn button Next thì tải qua bài mới
    },

    playRandomSong: function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    start: function(){
        // Định nghĩa các thuộc tính cho Object
        this.defineProperties()
        //Lắng nghe và xử lý các sự kiện (đang nói DOM Event)
        this.handleEvent()
        //Tải thông tin bài hát đầu tiên vào UI khi run App
        this.loadCurrentSong()

        //Render Playlist qqdqqdwq
        this.render()
    }

}
app.start()


