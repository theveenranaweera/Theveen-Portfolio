const Footer = () => {
  return (
    <footer className="">
      <div className="w-full mx-auto h-[1px] bg-blue-200/20" />
      <div className="max-w-7xl mx-auto py-6">
        <div className="text-center">
          <p className="text-sm text-foreground/60">
            Created, Crafted and Built by <span className="text-gradient-primary font-medium">Theveen Ranaweera</span>
          </p>
          <p className="text-[10px] text-muted-foreground mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;