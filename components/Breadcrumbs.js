function Breadcrumbs({ items }) {
  try {
    if (!items || items.length === 0) return null;

    return (
      <nav aria-label="Breadcrumb" className="py-4" data-name="breadcrumbs" data-file="components/Breadcrumbs.js">
        <ol itemScope itemType="https://schema.org/BreadcrumbList" className="flex items-center gap-2 text-sm text-gray-600">
          {items.map((item, index) => (
            <li 
              key={index}
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-2"
            >
              {item.href ? (
                <a 
                  itemProp="item" 
                  href={item.href}
                  className="hover:text-black transition-colors"
                >
                  <span itemProp="name">{item.name}</span>
                </a>
              ) : (
                <span itemProp="name" className="text-black">{item.name}</span>
              )}
              <meta itemProp="position" content={index + 1} />
              {index < items.length - 1 && (
                <div className="icon-chevron-right text-xs"></div>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  } catch (error) {
    console.error('Breadcrumbs error:', error);
    return null;
  }
}