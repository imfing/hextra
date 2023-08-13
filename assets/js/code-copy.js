document.querySelectorAll('.code-copy-btn').forEach(function (button) {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = button.getAttribute('data-clipboard-target');
    const target = document.querySelector(targetId);
    let codeElement;
    if (target.tagName === 'CODE') {
      codeElement = target;
    } else {
      // Select the last code element in case line numbers are present
      const codeElements = target.querySelectorAll('code');
      codeElement = codeElements[codeElements.length - 1];
    }
    if (codeElement) {
      // Replace double newlines with single newlines in the innerText
      // as each line inside <span> has trailing newline '\n'
      const code = codeElement.innerText.replace(/\n\n/g, '\n');
      navigator.clipboard.writeText(code).then(function () {
        button.classList.add('copied');
        setTimeout(function () {
          button.classList.remove('copied');
        }, 500);
      }).catch(function (err) {
        console.error('Failed to copy text: ', err);
      });
    } else {
      console.error('Target element not found');
    }
  });
});
