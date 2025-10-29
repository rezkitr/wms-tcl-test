interface IProps {
  title: string;
}

const PageHeaderTitle = ({ title }: IProps) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold">{title}</h1>
      <div className="h-1 w-10 bg-blue-700" />
    </div>
  );
};

export default PageHeaderTitle;
