export const metadata = {
  title: "خدمات | آوایس",
};

export default function ServicesLayout({ children }) {
  return (
    <div className="container mx-auto">
      <div className="relative">
        <div className="content-box">{children}</div>
      </div>
    </div>
  );
}
