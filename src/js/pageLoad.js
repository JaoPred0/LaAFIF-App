document.addEventListener("DOMContentLoaded", () => {
    async function carregarComponentes() {
        const elementos = document.querySelectorAll('[data-component]');

        for (const el of elementos) {
            const nome = el.getAttribute('data-component');
            const pasta = el.getAttribute('data-path') || 'base';
            const caminho = `${pasta}/${nome}.html`;

            try {
                const response = await fetch(caminho);

                if (!response.ok) {
                    throw new Error(`Erro ${response.status}: ${caminho}`);
                }

                const html = await response.text();
                el.innerHTML = html;
            } catch (err) {
                console.error(`❌ Falha ao carregar "${caminho}":`, err);
            }
        }

        // ✅ Reinicializa o AOS após todos os componentes serem carregados
        if (window.AOS) {
            AOS.init();
        }
    }

    carregarComponentes();
});
