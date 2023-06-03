export const Footer = (props) => {
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
            HỌC PHẦN: KHAI PHÁ DỮ LIỆU ĐA PHƯƠNG TIỆN
          </h5>
          <hr className="mx-auto w-[1695px] h-[0.3px] bg-gray-200 rounded border-0 md:my-7 dark:bg-gray-700" />
          <table className="text-indigo-50 ml-auto mr-auto text-lg">
            <tbody>
              <tr>
                <th className="text-right">Đề tài:</th>
                <td className="text-left pl-10">Recommendation System</td>
              </tr>
              <tr>
                <th className="text-right">Giảng viên hướng dẫn:</th>
                <td className="text-left pl-10">Đỗ Thị Liên</td>
              </tr>
              <tr>
                <th className="text-right">Nhóm thực hiện</th>
                <td className="text-left pl-10">09</td>
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
