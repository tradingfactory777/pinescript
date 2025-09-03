document.addEventListener('DOMContentLoaded', function() {
    // 이미지 팝업 관련 코드
    const zoomableImages = document.querySelectorAll('.zoomable-image');
    const imagePopup = document.getElementById('image-popup');
    const popupImage = document.getElementById('popup-image');
    const closeButton = document.querySelector('.close-button');

    // 각 확대 가능한 이미지에 클릭 이벤트 리스너 추가
    zoomableImages.forEach(image => {
        image.addEventListener('click', function() {
            imagePopup.style.display = 'flex'; // 팝업 보이기 (flex로 중앙 정렬)
            popupImage.src = this.src; // 클릭된 이미지의 src를 팝업 이미지에 설정
            popupImage.alt = this.alt; // alt 텍스트도 복사
        });
    });

    // 닫기 버튼 클릭 시 팝업 닫기
    closeButton.addEventListener('click', function() {
        imagePopup.style.display = 'none';
    });

    // 팝업 배경 클릭 시 팝업 닫기 (이미지 클릭 시는 제외)
    imagePopup.addEventListener('click', function(event) {
        if (event.target === imagePopup) { // 정확히 배경을 클릭했을 때만 닫기
            imagePopup.style.display = 'none';
        }
    });

    // ESC 키 눌렀을 때 팝업 닫기
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && imagePopup.style.display === 'flex') {
            imagePopup.style.display = 'none';
        }
    });

    // 스크립트 다운로드 버튼 관련 코드 (새로 추가)
    const downloadButton = document.querySelector('.download-button');

    downloadButton.addEventListener('click', function(event) {
        event.preventDefault(); // 링크의 기본 동작(페이지 이동) 방지

        const filePath = this.getAttribute('data-file'); // data-file 속성에서 파일 경로 가져오기
        const fileName = filePath.split('/').pop(); // 파일 경로에서 파일 이름 추출

        fetch(filePath)
            .then(response => response.text())
            .then(text => {
                const blob = new Blob([text], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('다운로드 중 오류 발생:', error);
                alert('파일 다운로드 중 오류가 발생했습니다.');
            });
    });
});