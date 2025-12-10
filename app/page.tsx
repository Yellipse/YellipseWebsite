import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="content">
        <h1 className="brand-name">Yellipse</h1>
        <div className="tagline">Made by students</div>

        <div className="mt-8">
          <Link
            href="/products-solutions"
            className="btn-purple"
          >
            Products & Solutions
          </Link>
        </div>
      </div>

      <div className="footer">
        &copy; 2025 Yellipse. All rights reserved.
        <br />
        Developer: <a href="https://github.com/ShameekTheDev" target="_blank" rel="noopener noreferrer">Shameek Biswas</a> | <a
          href="https://instagram.com/shameeeeekkk" target="_blank" rel="noopener noreferrer">insta</a>
      </div>
    </>
  );
}
