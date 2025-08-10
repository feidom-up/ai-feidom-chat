import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ 
  content, 
  className = '' 
}) => {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // 自定义标题样式
          h1: ({ children }) => <h1 className="markdown-h1">{children}</h1>,
          h2: ({ children }) => <h2 className="markdown-h2">{children}</h2>,
          h3: ({ children }) => <h3 className="markdown-h3">{children}</h3>,
          h4: ({ children }) => <h4 className="markdown-h4">{children}</h4>,
          
          // 自定义段落样式
          p: ({ children }) => <p className="markdown-p">{children}</p>,
          
          // 自定义列表样式
          ul: ({ children }) => <ul className="markdown-ul">{children}</ul>,
          ol: ({ children }) => <ol className="markdown-ol">{children}</ol>,
          li: ({ children }) => <li className="markdown-li">{children}</li>,
          
          // 自定义引用块样式
          blockquote: ({ children }) => (
            <blockquote className="markdown-blockquote">{children}</blockquote>
          ),
          
          // 自定义代码块样式
          code: ({ inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="markdown-code-block">
                <div className="code-header">
                  <span className="code-language">{match[1]}</span>
                  <div className="code-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <pre className="code-content">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            ) : (
              <code className="markdown-inline-code" {...props}>
                {children}
              </code>
            );
          },
          
          // 自定义表格样式
          table: ({ children }) => (
            <div className="markdown-table-wrapper">
              <table className="markdown-table">{children}</table>
            </div>
          ),
          th: ({ children }) => <th className="markdown-th">{children}</th>,
          td: ({ children }) => <td className="markdown-td">{children}</td>,
          
          // 自定义链接样式
          a: ({ children, href }) => (
            <a href={href} className="markdown-link" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          
          // 自定义强调样式
          strong: ({ children }) => <strong className="markdown-strong">{children}</strong>,
          em: ({ children }) => <em className="markdown-em">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

// 导出 Markdown 样式
export const markdownStyles = `
  .markdown-content {
    line-height: 1.6;
    color: #333;
  }
  
  /* 标题样式 */
  .markdown-h1 {
    font-size: 1.5em;
    font-weight: 700;
    color: #2d3748;
    margin: 1em 0 0.5em 0;
    border-bottom: 2px solid #667eea;
    padding-bottom: 0.3em;
  }
  
  .markdown-h2 {
    font-size: 1.3em;
    font-weight: 600;
    color: #2d3748;
    margin: 0.8em 0 0.4em 0;
    display: flex;
    align-items: center;
    gap: 0.5em;
  }
  
  .markdown-h3 {
    font-size: 1.1em;
    font-weight: 600;
    color: #4a5568;
    margin: 0.6em 0 0.3em 0;
  }
  
  .markdown-h4 {
    font-size: 1em;
    font-weight: 600;
    color: #4a5568;
    margin: 0.5em 0 0.25em 0;
  }
  
  /* 段落样式 */
  .markdown-p {
    margin: 0.5em 0;
    text-align: justify;
  }
  
  /* 列表样式 */
  .markdown-ul {
    margin: 0.5em 0;
    padding-left: 1.5em;
  }
  
  .markdown-ol {
    margin: 0.5em 0;
    padding-left: 1.5em;
  }
  
  .markdown-li {
    margin: 0.25em 0;
    line-height: 1.5;
  }
  
  .markdown-li::marker {
    color: #667eea;
  }
  
  /* 引用块样式 */
  .markdown-blockquote {
    margin: 1em 0;
    padding: 0.8em 1em;
    background: linear-gradient(90deg, #667eea20 0%, #764ba220 100%);
    border-left: 4px solid #667eea;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    position: relative;
  }
  
  .markdown-blockquote::before {
    content: '"';
    font-size: 3em;
    color: #667eea;
    position: absolute;
    left: 0.2em;
    top: -0.1em;
    line-height: 1;
    opacity: 0.3;
  }
  
  /* 代码样式 */
  .markdown-inline-code {
    background: #f7fafc;
    color: #e53e3e;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.85em;
    border: 1px solid #e2e8f0;
  }
  
  .markdown-code-block {
    margin: 1em 0;
    border-radius: 8px;
    overflow: hidden;
    background: #1a202c;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .code-header {
    background: #2d3748;
    padding: 0.5em 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #4a5568;
  }
  
  .code-language {
    color: #a0aec0;
    font-size: 0.8em;
    font-weight: 500;
    text-transform: uppercase;
  }
  
  .code-dots {
    display: flex;
    gap: 0.3em;
  }
  
  .code-dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #4a5568;
  }
  
  .code-dots span:nth-child(1) { background: #f56565; }
  .code-dots span:nth-child(2) { background: #ed8936; }
  .code-dots span:nth-child(3) { background: #48bb78; }
  
  .code-content {
    padding: 1em;
    overflow-x: auto;
    background: #1a202c;
    margin: 0;
  }
  
  .code-content code {
    color: #e2e8f0;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.9em;
    line-height: 1.5;
  }
  
  /* 表格样式 */
  .markdown-table-wrapper {
    overflow-x: auto;
    margin: 1em 0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .markdown-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
  }
  
  .markdown-th {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 0.75em 1em;
    text-align: left;
    font-weight: 600;
    border-bottom: 2px solid #5a67d8;
  }
  
  .markdown-td {
    padding: 0.75em 1em;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .markdown-table tr:nth-child(even) .markdown-td {
    background: #f7fafc;
  }
  
  .markdown-table tr:hover .markdown-td {
    background: #edf2f7;
  }
  
  /* 链接样式 */
  .markdown-link {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
    border-bottom: 1px solid transparent;
    transition: all 0.2s ease;
  }
  
  .markdown-link:hover {
    color: #5a67d8;
    border-bottom-color: #5a67d8;
  }
  
  /* 强调样式 */
  .markdown-strong {
    font-weight: 700;
    color: #2d3748;
  }
  
  .markdown-em {
    font-style: italic;
    color: #4a5568;
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    .markdown-h1 { font-size: 1.3em; }
    .markdown-h2 { font-size: 1.2em; }
    .markdown-h3 { font-size: 1.1em; }
    
    .markdown-table-wrapper {
      font-size: 0.9em;
    }
    
    .code-content {
      font-size: 0.8em;
    }
  }
`;