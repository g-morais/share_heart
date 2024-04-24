const cameraBotao = document.getElementById('cameraBotao');
        const galleryInput = document.getElementById('galleryInput');

        // Função para abrir a câmera
        cameraBotao.addEventListener('click', async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });

                // Mostrar a stream em um elemento de vídeo ou processar a imagem diretamente
            } catch (error) {
                console.error('Erro ao acessar a câmera:', error);
            }
        });

        // Função para selecionar uma imagem da galeria
        galleryInput.addEventListener('change', () => {
            const file = galleryInput.files[0];

            // Processar o arquivo de imagem selecionado
        });