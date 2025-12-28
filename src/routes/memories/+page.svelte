<script>
    import { fade, scale } from 'svelte/transition';
    import { goto } from '$app/navigation';

    // Data 6 foto dengan koordinat yang lebih merata (atas ke bawah)
    const photos = [
        { url: '/photos/1.png', label: 'Momen 1', rotate: '-5deg', top: '4%', left: '6%' },
        { url: '/photos/2.png', label: 'Momen 2', rotate: '6deg', top: '5%', left: '55%' },
        { url: '/photos/3.png', label: 'Momen 3', rotate: '-8deg', top: '40%', left: '55%' },
        { url: '/photos/4.png', label: 'Momen 4', rotate: '4deg', top: '38%', left: '6%' },
        { url: '/photos/5.png', label: 'Momen 5', rotate: '-4deg', top: '75%', left: '55%' },
        { url: '/photos/6.png', label: 'Momen 6', rotate: '7deg', top: '75%', left: '6%' },
    ];
</script>

<div class="wall-container" in:fade={{ duration: 800 }}>
    <div class="retro-header">
        <button class="back-btn" on:click={() => goto('/')} in:fade={{ delay: 1000 }}>Back</button> 
        <h1 class="title">Photos</h1>
    </div>

    <div class="wall-area">
    {#each photos as photo, i}
        <div 
            class="photo-pin photo-{i}" 
            style="top: {photo.top}; left: {photo.left}; transform: rotate({photo.rotate});"
            in:scale={{ delay: i * 150, duration: 600, start: 0.5 }}
        >
            <div class="nail"></div>
            <div class="polaroid">
                <img src={photo.url} alt={photo.label} />
                <p class="caption">{photo.label}</p>
            </div>
        </div>
    {/each}
</div>
    
    <button class="next-step" on:click={() => goto('/photobooth')} in:fade={{ delay: 1000 }}>
        Let's take a new one!
    </button>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Handlee&display=swap');

    .wall-container {
        min-height: 100vh;
        width: 100%;
        background-color: #fec7f9;
        /* Tekstur abstrak retro */
        background-image: 
            radial-gradient(#fde68a 1px, transparent 1px),
            linear-gradient(45deg, #fec7f9 25%, #fffbeb 25%, #fffbeb 50%, #fec7f9 50%, #fec7f9 75%, #fffbeb 75%, #fffbeb 100%);
        background-size: 20px 20px, 100px 100px;
        position: relative;
        overflow-y: auto; /* Izinkan scroll jika layar kecil */
        padding-bottom: 120px;
    }

    .retro-header {
        padding: 20px 1px 1px 20px;
        text-align: center;
        z-index: 10;
        position: sticky; /* Tetap di atas saat scroll */
        top: 0;
    }

    .back-btn {
        position: fixed; bottom: 15px; left: 50px;
        background: #ec468b; color: white;
        padding: 12px 20px; border-radius: 50px;
        font-family: 'Fredoka One'; font-size: 1rem;
        border: none; cursor: pointer;
        box-shadow: 0 10px 20px rgba(0,0,0,0.2); z-index: 100;
    }

    .title {
        font-family: 'Fredoka One', cursive;
        color: #be185d; font-size: 2rem;
        text-shadow: 3px 3px 0 #fbcfe8;
    }

    .wall-area {
        position: relative;
        width: 100%;
        max-width: 600px; /* Lebar dibatasi agar sebaran left/right pas */
        height: 750px;    /* Tinggi area foto diperpendek agar tidak terlalu ke bawah */
        margin: 0 auto;
    }

    .photo-pin {
        position: absolute;
        width: 180px; /* Ukuran diperkecil sedikit agar muat 6 */
        transition: transform 0.3s ease;
        z-index: 2;
    }

    .photo-pin:hover {
        transform: scale(1.1) rotate(0deg) !important;
        z-index: 50;
    }

    .nail {
        width: 12px; height: 12px;
        background: radial-gradient(circle at 30% 30%, #94a3b8, #475569);
        border-radius: 50%; position: absolute;
        top: -8px; left: 50%; transform: translateX(-50%);
        z-index: 10; box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .polaroid {
        background: white; padding: 8px 8px 20px 8px;
        box-shadow: 5px 10px 20px rgba(0,0,0,0.1);
        border: 1px solid #ddd;
    }

    .polaroid img {
        width: 100%; height: 120px;
        object-fit: cover; border: 1px solid #eee;
    }

    .caption {
        font-family: 'Handlee', cursive;
        text-align: center; margin-top: 8px;
        color: #334155; font-size: 0.9rem;
    }

    .next-step {
        position: fixed; bottom: 15px; right: 50px;
        background: #1e293b; color: white;
        padding: 12px 20px; border-radius: 50px;
        font-family: 'Fredoka One'; font-size: 1rem;
        border: none; cursor: pointer;
        box-shadow: 0 10px 20px rgba(0,0,0,0.2); z-index: 100;
    }

    @media (max-width: 600px) {
        .photo-pin { width: 150px; }
        .wall-area { height: 600px; }
    }

    /* KHUSUS DESKTOP (Layar > 1024px) */
    @media (min-width: 1024px) {
        .wall-area {
            max-width: 1100px; /* Area lebih lebar */
            height: 650px;
        }

        .photo-pin {
            width: 190px; /* Foto lebih besar di desktop */
        }

        /* Anda bisa atur angka % ini secara manual sampai pas */
        .photo-0 { top: 5% !important; left: 5% !important; }
        .photo-1 { top: 10% !important; left: 40% !important; }
        .photo-2 { top: 5% !important; left: 75% !important; }
        
        .photo-3 { top: 50% !important; left: 10% !important; }
        .photo-4 { top: 55% !important; left: 45% !important; }
        .photo-5 { top: 50% !important; left: 80% !important; }
    }
</style>