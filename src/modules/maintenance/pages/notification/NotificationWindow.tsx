import React, { useEffect, useState } from "react";

// Mở rộng interface NotificationOptions để bao gồm thuộc tính image
interface CustomNotificationOptions extends NotificationOptions {
  image?: string;
}

const NotificationWindow: React.FC = () => {
  const [countdown, setCountdown] = useState<number | null>(null);

  // Yêu cầu quyền thông báo khi component được mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        console.log("Quyền thông báo:", permission);
      });
    }
  }, []);

  // Hàm hiển thị thông báo với hình ảnh, icon và xử lý khi click vào thông báo
  const showNotification = (message: string) => {
    const title = `Thông báo từ ${window.location.hostname}`;
    const options: CustomNotificationOptions = {
      body: message,
      // icon: "https://vmsco.vn/wp-content/uploads/2025/02/VMS-LOGO-VN-scaled.jpg", // URL icon thay đổi theo nhu cầu
      image:
        "https://vmsco.vn/wp-content/uploads/2025/02/VMS-LOGO-VN-scaled.jpg", // URL hình ảnh trong thông báo
    };

    const notification = new Notification(title, options);

    // Khi click vào thông báo sẽ redirect đến trang được chỉ định
    notification.onclick = (e) => {
      e.preventDefault();
      window.location.href = "https://vmsco.vn/your-target-page"; // Thay đổi URL theo nhu cầu của bạn
    };

    // Tự động đóng thông báo sau 10 giây
    setTimeout(() => {
      notification.close();
    }, 10000);
  };

  // Hàm bắt đầu bộ đếm 10 giây và sau đó hiển thị thông báo
  const startCountdown = () => {
    setCountdown(10);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev !== null && prev > 1) {
          return prev - 1;
        } else {
          clearInterval(interval);
          // Sau khi đếm ngược xong, hiển thị thông báo
          showNotification("Thông báo sau khi đếm ngược 10 giây");
          return null;
        }
      });
    }, 1000);
  };

  // Hàm xử lý khi click vào button
  const handleClick = () => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        startCountdown();
      } else if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            startCountdown();
          }
        });
      } else {
        alert("Bạn đã chặn thông báo, vui lòng bật lại!");
      }
    } else {
      alert("Trình duyệt không hỗ trợ Notification!");
    }
  };

  return (
    <div>
      <h1>Test Thông Báo</h1>
      <button onClick={handleClick}>
        Click để bắt đầu đếm ngược và hiển thị thông báo
      </button>
      {countdown !== null && (
        <div style={{ marginTop: "20px", fontSize: "1.2rem" }}>
          Đếm ngược: {countdown} giây
        </div>
      )}
    </div>
  );
};

export default NotificationWindow;
