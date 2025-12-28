<script>
    import { fly, scale } from 'svelte/transition';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { bgmStore } from '$lib/audioStore';

    onMount(() => {
        bgmStore.showButton();
    });

    let cards = [
        {
            id: 1,
            type: 'cover',
            bgClass: 'bg-lavender',
            name: '@21thofmay'
        },
        {
            id: 2,
            type: 'text',
            bgClass: 'bg-paper',
            image: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTR4c201d3Q5a2U0MGNjYWJhaWF0ZGo2azVvZGszYmJ1a2gwMHExZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l9fVX1zfHYGd4rIk47/giphy.gif',
            text: 'Hai halo selamat hari paling keren sedunia. selamat sembilan belas tahun! kamu cepet dewasa juga yaa huhu 😢 it’s always honor to witness ur growth. seneng banget masih bisa ucapin kamu ulang tahun 🎂 thank you for being who you are now!',
            from: '- 21thofmay',
            color: '#000'
        },
        {
            id: 3,
            type: 'text',
            bgClass: 'bg-paper',
            image: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHNwNm1wbHkwbmZrZmdxMWh6MHNlbTMxMTBjaTV0MnN0dnY2c21oYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YpdffG6XDooX5KVlbK/giphy.gif',
            text: 'I wish you a lot happier n healthier, i hope you heal from things you dont talk about. thank you for being such an extraordinary person <3 terima kasih sudah lahir!!! you learn a lot.',
            from: '- 21thofmay',
            color: '#be185d'
        },
        {
            id: 4,
            type: 'text',
            bgClass: 'bg-paper',
            image: 'https://media0.giphy.com/media/v1.Y2lkPTNhYWU4ZTViM3h0djV5OHJudXRhbGdpZ2pyZnc3YTRrMTd6ejFnOHNwajZrZG0yYyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/l3mZaDLAkulVmve5a/200.gif',
            text: 'Kamu udah keren maksudnya you know what’s the best for yourself itu keren banget buat aku, mamah kamu juga pasti bangga and you’re enough <3',
            from: '- 21thofmay',
            color: '#be185d'
        },
        {
            id: 99,
            type: 'simple-paper',
            bgClass: 'bg-paper',
            text: 'Pokoknya aku punya segudang doa baik buat kamu. doa dan pesanku masih sama kok kayak tahun kemarin hehehe semoga kamu selalu baik-baik aja yaa meskipun harus hidup diantara banyaknya stereotip manusia, semoga kamu selalu merasa dicintai. semogaa kamu selalu dikelilingi hal hal baik, bahagia teruuuss, hari hari nya berjalan lancaaar dan semua yang kamu pengenin terkabul! yeyeyey pokoknya selamat ulang tahun orang keren, selamat makin dewasa. doa terbaik dari aku (selalu) ! kamu doa yang banyak yaa nanti aku aamiin-in.',
            from: '- 21thofmay',
            color: '#334155'
        },
        {
            id: 100,
            type: 'simple-paper',
            bgClass: 'bg-paper',
            text: 'Maaf yaa kalau tahun ini aku sering banget gangguin kamu hehehe sebenernya karena simply aku takut tahun depan aku ga bisa gangguin kamu lagi HAHAHA duh sebenernya aku gengsi banget ngetik ini semua tapi yaudah lah kapan lagi 😔 so if one day, we don’t talk like how we used to do (sebenernya udah jarang ngobrol juga sih) but you will always be the first person i want to tell all my stories (even if i can’t), i will always support you from afar, i will always care for you, i will always be worried of you if you are at your lowest',
            from: '- 21thofmay',
            color: '#334155'
        },
        {
            id: 101,
            type: 'simple-paper',
            bgClass: 'bg-paper',
            text: 'I will always be there for you (even if you feel like i don’t) and even the world doesn’t clap for you, i will! i’ll always come running to you just to tell you how proud i am, even of the simplest little things you achieve ⭐️ pokoknyaa semoga kamu selalu jaga diri baik-baik yaa anak baiiiik HAHAHAHAHA KAMU TAU aku ngetik anak baiknya kayak proud mom banget tau ngga 😎 i guess what i’m trying to say is… thank you for being part of a chapter that still feels warms when i remember it! lastly, hope this year treat you better yaa 🥳 kata qibo kangen ily deeh kakak lucu!!!',
            from: '- 21thofmay',
            color: '#334155'
        },
        {
            id: 5,
            type: 'spotify',
            title: 'Song for You',
            trackId: '6klFWv2xDGeTDoiKTtx4hg?si=53fef475abd04f13'
        }, 
        {
            id: 6,
            type: 'final',
            bgClass: 'bg-gradient-pink',
            text: 'memory for you!'
        },
    ];

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    function startDrag(e) {
        isDragging = true;
        startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    }

    function onDrag(e) {
        if (!isDragging) return;
        const x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        currentX = x - startX;
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        
        if (Math.abs(currentX) > 100) {
            if (currentX < 0) nextCard();
            else prevCard();
        }
        
        currentX = 0;
    }

    function nextCard() { 
        const first = cards[0];
        cards = [...cards.slice(1), first];
    }

    function prevCard() { 
        const last = cards[cards.length - 1];
        cards = [last, ...cards.slice(0, cards.length - 1)];
    }

    function openGift() {
    goto('/photobooth');
    }

    function openGallery() {
    goto('/memories');
}
</script>

<svelte:window 
    on:mousemove={onDrag} 
    on:mouseup={endDrag} 
    on:touchmove={onDrag} 
    on:touchend={endDrag} 
/>

<div class="scene-container">
    
    <div class="top-indicator">
        Created by justcode.my.id
    </div>

    <div class="stack-wrapper">
        
        <div class="backing-card purple-accent"></div>

        {#each cards.slice(0, 3).reverse() as card, i (card.id)}
            {@const displayIndex = (cards.slice(0, 3).length - 1) - i}
            
            <div 
                class="card-base {card.bgClass}"
                class:active-card={displayIndex === 0}
                class:dragging={displayIndex === 0 && isDragging} 
                
                on:mousedown={displayIndex === 0 ? startDrag : null}
                on:touchstart={displayIndex === 0 ? startDrag : null}

                style="
                    z-index: {100 - displayIndex};
                    
                    /* LOGIKA TRANSFORMASI: STACK + SWIPE */
                    transform: 
                        {displayIndex === 0 && isDragging 
                            ? `translate(${currentX}px, ${currentX * 0.1}px) rotate(${currentX * 0.05}deg)` 
                            : 
                            displayIndex === 0 ? 'rotate(0deg)' :
                            displayIndex === 1 ? 'translate(8px, -5px) rotate(3deg)' :
                            displayIndex === 2 ? 'translate(-8px, 5px) rotate(-2deg)' : ''
                        };
                "
                in:scale={{ duration: 300, start: 0.9 }}
                out:fly={{ x: -300, opacity: 0, duration: 500 }}
            >
                {#if card.type === 'cover'}
                    <div class="cover-design">
                        <div class="abstract-bg"></div>
                        <div class="content-wrapper">
                            <div class="happy-row">
                                <span class="char c1">H</span><span class="char c2">A</span><span class="char c3">P</span><span class="char c4">P</span><span class="char c5">Y</span>
                            </div>
                            <h1 class="birthday-title">BIRTHDAY</h1>
                            <div class="name-badge">From {card.name} ❤️</div>
                        </div>
                    </div>

                {:else if card.type === 'text'}
                    <div class="text-design">
                        <div class="polaroid">
                            <img src={card.image} alt="Gif" loading="lazy">
                            <span class="icon-sparkle top-right">✨</span>
                            <span class="icon-sparkle bottom-left">💖</span>
                        </div>
                        <p class="msg" style="color: {card.color || '#555'}">"{card.text}"</p>
                        <span class="sender" style="color: {card.color || '#555'}">{card.from}</span>
                    </div>

                    {:else if card.type === 'simple-paper'}
                    <div class="simple-paper-design">
                        <div class="tape-strip"></div>
                        
                        <div class="paper-content">
                            <p class="paper-msg" style="color: {card.color}">"{card.text}"</p>
                            <span class="paper-sender" style="color: {card.color}">{card.from}</span>
                        </div>
                    </div>

                {:else if card.type === 'spotify'}
                    <div class="spotify-clean-card">
                        {#if card.title}
                            <h3 class="spotify-header">{card.title}</h3>
                        {/if}

                        <div class="single-track-wrapper">
                            <iframe 
                                src="https://open.spotify.com/embed/track/{card.trackId}?utm_source=generator&theme=0" 
                                width="100%" 
                                height="352" 
                                frameBorder="0" 
                                allowfullscreen="" 
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                                loading="lazy">
                            </iframe>
                        </div>
                    </div>

                {:else if card.type === 'final'}
                        <div class="final-design">
                            <div class="photo-stack-art">
                                <div class="photo-leaf p1"></div>
                                <div class="photo-leaf p2"></div>
                                <div class="photo-leaf p3">
                                    <div class="inner-photo">
                                        <div class="heart-icon">❤️</div>
                                    </div>
                                </div>
                            </div>
                            
                            <h2 class="gamja-font">Photo Memory</h2>
                            <p class="gamja-font">{card.text}</p>
                            
                            <button class="reply-btn gamja-font" on:click={openGallery}>
                                Tap to Open
                            </button>
                        </div>
                    {/if}
            </div>
        {/each}

    </div>

    <div class="controls-area">
        <div class="buttons-row">
            <button on:click={prevCard} class="nav-btn prev">
                <i class="fa-solid fa-arrow-left"></i>
            </button>
            <button on:click={openGift} class="action-btn">Snap Studio</button>  
            <button on:click={nextCard} class="nav-btn next">
                <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    </div>

</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Gamja+Flower&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Homemade+Apple&display=swap');    
    .scene-container {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        perspective: 1000px;
    }

    .top-indicator {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
        background: rgba(255,255,255,0.6);
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
        color: #64748b;
        backdrop-filter: blur(4px);
        box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }

    .stack-wrapper {
        position: absolute;
        top: 50%; 
        left: 50%;
        transform: translate(-50%, -50%); 
        width: 330px; 
        height: 460px; 
        z-index: 10;
        margin-top: -30px;
    }

    .backing-card {
        position: absolute; inset: 0;
        border-radius: 0;
        z-index: -1;
        transform: translate(-12px, -8px) rotate(-4deg);
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    .purple-accent { background: #d8b4fe; } 

    .card-base {
        position: absolute;
        inset: 0;
        border-radius: 0;
        background: white;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        border: 1px solid rgba(0,0,0,0.05);
        overflow: hidden;
        transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s;
        transform-origin: center center;
        user-select: none;
        touch-action: none;
    }

    .card-base.dragging {
        transition: none !important;
        cursor: grabbing;
        box-shadow: 0 20px 40px -5px rgba(0,0,0,0.2);
    }

    .active-card {
    }

    .controls-area {
        position: absolute;
        bottom: 80px; 
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 320px;
        z-index: 20;
    }
    
    .buttons-row { 
        display: flex; gap: 15px; width: 100%; justify-content: space-between; align-items: center; 
    }

    .nav-btn { 
        width: 50px;
        height: 50px; 
        border-radius: 50%; 
        border: none; 
        background: white; 
        box-shadow: 0 4px 10px rgba(0,0,0,0.1); 
        font-size: 1.2rem; 
        cursor: pointer; 
        color: #1e293b;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .nav-btn:hover { transform: scale(1.1); background: #f8fafc; }
    
    .action-btn { 
        flex: 1;
        height: 50px;
        background: rgba(242, 32, 172, 0.685); 
        border: 1px solid rgb(255, 255, 255); 
        border-radius: 50px; 
        font-weight: bold; 
        color: #fcfcfc; 
        cursor: pointer;
        backdrop-filter: blur(4px); 
        box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }

    .bg-lavender { background: #f3e8ff; }
    .bg-paper { background: #fff; background-image: radial-gradient(#cbd5e1 1px, transparent 1px); background-size: 20px 20px; }
    .bg-gradient-pink { background: linear-gradient(135deg, #fbcfe8, #f472b6); }

    .cover-design { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; }
    .abstract-bg { position: absolute; inset: -50px; background: radial-gradient(circle at 80% 20%, #fde047 0%, transparent 40%), radial-gradient(circle at 20% 80%, #f472b6 0%, transparent 40%); filter: blur(40px); opacity: 0.6; }
    .content-wrapper { z-index: 10; text-align: center; }
    .happy-row { display: flex; gap: 5px; justify-content: center; margin-bottom: 1px; }
    .char { font-family: 'Fredoka One', cursive; font-size: 4rem; color: white; text-shadow: 3px 3px 0px rgba(0,0,0,0.1); display: inline-block; }
    .c1 { transform: rotate(-5deg); text-shadow: 3px 3px 0 #ec4899; }
    .c2 { transform: rotate(3deg); text-shadow: 3px 3px 0 #a855f7; }
    .c3 { transform: rotate(-3deg); text-shadow: 3px 3px 0 #eab308; }
    .c4 { transform: rotate(5deg); text-shadow: 3px 3px 0 #3b82f6; }
    .c5 { transform: rotate(-4deg); text-shadow: 3px 3px 0 #f43f5e; }
    .birthday-title { font-family: 'Fredoka One', cursive; font-size: 3rem; color: #334155; letter-spacing: 2px; margin: 0; }
    .name-badge { margin-top: 20px; background: white; padding: 15px 25px; border-radius: 50px; font-family: 'Handlee', cursive; font-weight: bold; color: #475569; box-shadow: 0 4px 6px rgba(0,0,0,0.05); transform: rotate(-2deg); display: inline-block; }

    .text-design { padding: 20px; height: 100%; display: flex; flex-direction: column; font-family: 'Handlee', cursive; }
    .polaroid {
    position: relative;
    background-color: #fff;
    background-image: url("https://www.transparenttextures.com/patterns/cream-paper.png");
    padding: 10px 10px 10px 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    transform: rotate(2deg);
    margin-bottom: 30px;
}
    .polaroid img { width: 100%; height: 180px; object-fit: contain; display: block; pointer-events: none; }
    .polaroid::before {
    content: "";
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%) rotate(-2deg);
    width: 60px;
    height: 20px;
    background: rgba(244, 114, 182, 0.5);
    backdrop-filter: blur(2px);
    z-index: 2;
}
    .msg { font-family: 'Gamja Flower', cursive; font-size: 1.25rem; color: #334155; line-height: 1.3; text-align: center; }
    .sender { font-family: 'Handlee', cursive; margin-top: auto; text-align: right; font-weight: bold; color: #94a3b8; }

    .final-design { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px; }
    .big-icon { font-size: 4rem; margin-bottom: 10px; }
    .final-design h2 { font-family: 'Fredoka One'; color: #be185d; font-size: 2rem; margin: 0 0 10px 0; }
    .reply-btn { margin-top: 30px; background: #1e293b; color: white; padding: 12px 30px; border-radius: 50px; font-weight: bold; border: none; cursor: pointer; transition: transform 0.2s; }
    .reply-btn:active { transform: scale(0.95); }

    .spotify-clean-card {
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, #08780a 0%, #000000 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
        border-radius: 0px;
    }

    .spotify-header {
        font-family: 'Handlee', cursive;
        color: #ffffff;
        margin-bottom: 20px;
        font-size: 2rem;
    }

    .single-track-wrapper {
        width: 100%;
        max-width: 330px;
        border-radius: 0px;
        overflow: hidden;
        line-height: 0;
        transition: transform 0.3s ease;
    }

    .single-track-wrapper:hover {
        transform: translateY(-5px);
    }

    @media (min-width: 1024px) {
        .stack-wrapper {
            width: 380px;
            height: 500px;
            margin-top: -0px;
        }
        .controls-area {
            max-width: 450px;
            bottom: 15px;
        }

        .card-base:hover {
            box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }
        .msg { font-size: 1.35rem; line-height: 1.5; text-align: center; }

    }

    .icon-sparkle {
    position: absolute;
    font-size: 1.2rem;
    z-index: 5;
}
.top-right { top: 30px; right: 5px; }
.bottom-left { bottom: 30px; left: 5px; }

.photo-stack-art {
        position: relative;
        width: 120px;
        height: 120px;
        margin: 0 auto 40px;
        animation: global-float 4s ease-in-out infinite;
        will-change: transform;
    }

    .photo-leaf {
        position: absolute;
        width: 120px;
        height: 120px;
        background: white;
        border: 1px solid #ddd;
        box-shadow: 2px 4px 10px rgba(0,0,0,0.1);
        border-radius: 4px;
        left: 5px;
        top: 10px;
    }

    .p1 { transform: rotate(-15deg); background: #f9fafb; }
    .p2 { transform: rotate(10deg); background: #f3f4f6; }
    .p3 { 
        transform: rotate(-5deg); 
        z-index: 3; 
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px;
    }

    .inner-photo {
        width: 100%;
        height: 70%;
        background: #fbcfe8;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
    }

    .heart-icon {
        font-size: 2rem;
        animation: heartbeat 1.5s ease-in-out infinite;
    }


    @keyframes global-float {
        0%, 100% { transform: translateY(0) rotate(0); }
        50% { transform: translateY(-15px) rotate(5deg); }
    }

    @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }

    .gamja-font {
        font-family: 'Gamja Flower', cursive; font-size: 25px;
    }

    /* =========================================
       STYLE SIMPLE PAPER (RESPONSIVE)
       ========================================= */
    
    /* --- 1. TAMPILAN MOBILE / DEFAULT (Layar Kecil) --- */
    .simple-paper-design {
        height: 100%;
        padding: 30px 20px; /* Padding lebih rapat */
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .tape-strip {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%) rotate(-2deg);
        width: 100px;  /* Selotip lebih kecil di HP */
        height: 30px;
        background-color: rgba(255, 255, 255, 0.4);
        border-left: 2px dotted rgba(0,0,0,0.1);
        border-right: 2px dotted rgba(0,0,0,0.1);
        backdrop-filter: blur(2px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        z-index: 5;
    }

    .paper-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border: 1px dashed rgba(0,0,0,0.08); /* Garis putus-putus tipis */
        padding: 5px;
        border-radius: 4px;
    }

    .paper-msg {
        font-family: 'Gamja Flower', cursive;
        font-size: 1.13rem; /* Font sedang untuk HP */
        line-height: 1.5;  /* Jarak antar baris rapat */
        text-align: center;
        margin-bottom: 15px;
        white-space: pre-line; /* Agar bisa enter/baris baru */
    }

    .paper-sender {
        font-family: 'Handlee', cursive;
        font-size: 1rem;
        font-weight: bold;
        text-align: right;
        margin-top: auto;
        opacity: 0.8;
    }

    /* --- 2. TAMPILAN DESKTOP / LAPTOP (Layar Besar) --- */
    /* Masukkan ini di dalam blok media query yang sudah ada, atau buat baru */
    @media (min-width: 1024px) {
        
        .simple-paper-design {
            padding: 30px 10px; /* Padding lebih lega */
        }

        .tape-strip {
            width: 140px; /* Selotip lebih panjang */
            height: 40px;
            top: -18px;
        }

        .paper-content {
            padding: 10px; /* Area tulis lebih luas */
            border-width: 2px; /* Garis tepi lebih tegas */
        }

        .paper-msg {
            font-size: 1.1rem; /* Font JAUH LEBIH BESAR */
            line-height: 1.8;  /* Jarak baris lebih renggang */
        }

        .paper-sender {
            font-size: 1.2rem;
        }
    }
</style>