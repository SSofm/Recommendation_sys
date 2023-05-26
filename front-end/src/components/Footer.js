export const Footer = (props) => {
  console.log("in footer: ", props.posFooter);
  const par = "relative";
  const child = "fixed bottom-0 w-full";
  return (
    <div className={props.posFooter ? par : "sticky top-0"}>
      <div className={props.posFooter ? child : ""}>
        <div className="w-full h-80 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 px-1">
          <h5 className="font-medium leading-tight text-lg mb-2 text-indigo-50 pt-5">
            HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG
          </h5>
          <h5 className="font-medium leading-tight text-lg mb-2 text-indigo-50">
            KHOA ĐA PHƯƠNG TIỆN - CHUYÊN NGÀNH PHÁT TRIỂN ỨNG DỤNG ĐA PHƯƠNG
            TIỆN
          </h5>
          <h5 className="font-medium leading-tight text-lg mb-2 text-indigo-50">
            BÀI THI KẾT THÚC HỌC PHẦN
          </h5>
          <h5 className="font-medium leading-tight text-lg text-indigo-50">
            HỌC PHẦN: LẬP TRÌNH WEB
          </h5>
          <hr className="mx-auto w-[1695px] h-[0.3px] bg-gray-200 rounded border-0 md:my-7 dark:bg-gray-700" />
          <table className="text-indigo-50 ml-auto mr-auto text-lg">
            <tbody>
              <tr>
                <th className="text-right">Sinh viên thực hiện</th>
                <td className="text-left pl-10">Nguyễn Văn Sang</td>
              </tr>
              <tr>
                <th className="text-right">Mã sinh viên</th>
                <td className="text-left pl-10">B19DCPT190</td>
              </tr>
              <tr>
                <th className="text-right">Lớp</th>
                <td className="text-left pl-10">D19PTDPT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
