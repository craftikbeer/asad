function SocialShare({ product, className = '' }) {
  try {
    const shareUrl = `https://andersdenim.ru/index.html#product-${product.id}`;
    const shareText = `${product.name} - ${product.price.toLocaleString()}₽ | ANDERS`;

    const shareLinks = {
      vk: `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      copy: shareUrl
    };

    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = (platform) => {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    };

    return (
      <div className={`flex items-center gap-2 ${className}`} data-name="social-share" data-file="components/SocialShare.js">
        <button
          onClick={() => handleShare('telegram')}
          className="w-9 h-9 border border-gray-300 rounded-full flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-all"
          title="Поделиться в Telegram"
        >
          <div className="icon-send text-base text-blue-500"></div>
        </button>
        <button
          onClick={() => handleShare('whatsapp')}
          className="w-9 h-9 border border-gray-300 rounded-full flex items-center justify-center hover:border-green-500 hover:bg-green-50 transition-all"
          title="Поделиться в WhatsApp"
        >
          <div className="icon-message-circle text-base text-green-500"></div>
        </button>
        <button
          onClick={() => handleShare('vk')}
          className="w-9 h-9 border border-gray-300 rounded-full flex items-center justify-center hover:border-blue-600 hover:bg-blue-50 transition-all"
          title="Поделиться ВКонтакте"
        >
          <div className="icon-share-2 text-base text-blue-600"></div>
        </button>
        <button
          onClick={handleCopy}
          className="w-9 h-9 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-600 hover:bg-gray-50 transition-all"
          title="Копировать ссылку"
        >
          <div className={`icon-${copied ? 'check' : 'link'} text-base ${copied ? 'text-green-500' : 'text-gray-600'}`}></div>
        </button>
      </div>
    );
  } catch (error) {
    console.error('SocialShare error:', error);
    return null;
  }
}