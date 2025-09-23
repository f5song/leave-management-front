interface HeaderProps {
    title: string;
}

const Header = ({ title }: HeaderProps) => {
    return (
        <div className="flex flex-row justify-between border-b border-[#676767] w-full my-6">
            <p className="font-sukhumvit text-[28px] md:text-[36px] font-bold text-center">{title}</p>
        </div>
    );
};

export default Header;
