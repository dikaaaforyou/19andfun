<script>
    import "../app.css";
    import { bgmStore } from '$lib/audioStore'; // Import remot tadi

    let audio;

    // Reaktif: Cek perintah dari store (Play/Pause)
    $: if (audio) {
        if ($bgmStore.isPlaying) {
            audio.play().catch(() => console.log("Menunggu interaksi user..."));
        } else {
            audio.pause();
        }
    }
</script>

<audio bind:this={audio} src="/music/bgm.mp3" loop preload="auto"></audio>

{#if $bgmStore.isVisible}
    <button 
        class="bgm-btn"
        on:click={() => bgmStore.togglePlay()}
        title="Toggle Music"
    >
        {#if $bgmStore.isPlaying}
            <i class="fa-solid fa-volume-high"></i>
        {:else}
            <i class="fa-solid fa-volume-xmark"></i>
        {/if}
    </button>
{/if}

<slot />

<style>
    .bgm-btn {
        position: fixed;
        z-index: 100;
        top: 20px;
        right: 20px;
        
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.8);
        border: 2px solid #ff91c9; /* Warna pink senada */
        color: #d63384;
        
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        backdrop-filter: blur(4px);
        transition: all 0.2s ease;
    }

    .bgm-btn:hover {
        transform: scale(1.1);
        background: #fff;
    }

    /* Penyesuaian Mobile (opsional, jika ingin lebih rapi di layar kecil) */
    @media (max-width: 640px) {
        .bgm-btn {
            top: 15px;
            right: 15px;
            width: 40px;
            height: 40px;
            font-size: 1rem;
        }
    }
</style>