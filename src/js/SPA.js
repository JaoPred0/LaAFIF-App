/**
 * Exibe uma seção SPA específica e oculta as demais com animação suave
 * @param {string} id - ID da div que deve ser exibida
 * @param {string} classeGrupo - Classe comum das seções SPA (padrão: 'spa')
 */
function Spa(id, classeGrupo = 'spa') {
    const divs = document.querySelectorAll(`.${classeGrupo}`);

    divs.forEach(div => {
        if (!div.classList.contains('oculto')) {
            div.classList.add('fade-out');
            setTimeout(() => {
                div.classList.add('oculto');
                div.classList.remove('fade-out', 'fade-in');
            }, 300);
        }
    });

    const divAtiva = document.getElementById(id);

    if (divAtiva) {
        setTimeout(() => {
            divAtiva.classList.remove('oculto');
            divAtiva.classList.add('fade-in');
        }, 300);
    } else {
        console.warn(`⚠️ Elemento com id "${id}" não encontrado.`);
    }
}
