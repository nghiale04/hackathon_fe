import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  FileText,
  Video,
  Headphones,
  ExternalLink,
  Home,
  Users,
  Heart,
  Book,
  Globe,
} from "lucide-react";
import ResourceCard from "../components/ResourceCode";
import "../styles/resources.css";

function Resources() {
  const [activeTab, setActiveTab] = useState("family");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <main className="resources-main" style={{ marginTop: "70px" }}>
      <div className="resources-content">
        <h1 className="page-title">Tài Nguyên Sức Khỏe Tâm Lý</h1>
        <p className="page-description">
          Khám phá bộ sưu tập tài nguyên của chúng tôi để giúp bạn hiểu và cải
          thiện các vấn đề tâm lý trong các mối quan hệ gia đình, bạn bè, tình
          cảm, học tập và mạng xã hội. Những tài liệu này được lựa chọn cẩn thận
          để cung cấp hỗ trợ và hướng dẫn phù hợp.
        </p>

        <div className="tabs">
          <div className="tabs-list">
            <button
              className={`tab-button ${activeTab === "family" ? "active" : ""}`}
              onClick={() => handleTabChange("family")}
            >
              Gia Đình
            </button>
            <button
              className={`tab-button ${
                activeTab === "friends" ? "active" : ""
              }`}
              onClick={() => handleTabChange("friends")}
            >
              Bạn Bè
            </button>
            <button
              className={`tab-button ${
                activeTab === "relationship" ? "active" : ""
              }`}
              onClick={() => handleTabChange("relationship")}
            >
              Tình Cảm
            </button>
            <button
              className={`tab-button ${activeTab === "study" ? "active" : ""}`}
              onClick={() => handleTabChange("study")}
            >
              Học Tập
            </button>
            <button
              className={`tab-button ${activeTab === "social" ? "active" : ""}`}
              onClick={() => handleTabChange("social")}
            >
              Mạng Xã Hội
            </button>
          </div>

          <div
            className={`tab-content ${activeTab === "family" ? "active" : ""}`}
            id="family-tab"
          >
            <h2 className="tab-title">Tài Nguyên về Gia Đình</h2>

            <div className="resources-grid">
              <ResourceCard
                icon={<Home className="resource-icon" />}
                title="Giao Tiếp Hiệu Quả trong Gia Đình"
                description="Học cách lắng nghe và chia sẻ cảm xúc với các thành viên trong gia đình một cách hiệu quả."
                type="Bài viết"
              />
              <ResourceCard
                icon={<Video className="resource-icon" />}
                title="Giải Quyết Xung Đột Gia Đình"
                description="Các kỹ thuật và chiến lược để giải quyết mâu thuẫn trong gia đình một cách hòa bình."
                type="Video"
              />
              <ResourceCard
                icon={<FileText className="resource-icon" />}
                title="Sổ Tay Xây Dựng Mối Quan Hệ Gia Đình"
                description="Các bài tập và hoạt động để tăng cường sự gắn kết và hiểu biết trong gia đình."
                type="Sổ tay"
              />
              <ResourceCard
                icon={<Headphones className="resource-icon" />}
                title="Thiền Định Gia Đình"
                description="Bài thiền hướng dẫn để các thành viên trong gia đình cùng thực hành và thư giãn."
                type="Audio"
              />
            </div>
          </div>

          <div
            className={`tab-content ${activeTab === "friends" ? "active" : ""}`}
            id="friends-tab"
          >
            <h2 className="tab-title">Tài Nguyên về Bạn Bè</h2>

            <div className="resources-grid">
              <ResourceCard
                icon={<Users className="resource-icon" />}
                title="Xây Dựng Tình Bạn Lành Mạnh"
                description="Hiểu về các yếu tố tạo nên một tình bạn lành mạnh và cách duy trì nó."
                type="Bài viết"
              />
              <ResourceCard
                icon={<Video className="resource-icon" />}
                title="Kỹ Năng Giao Tiếp với Bạn Bè"
                description="Cách thể hiện bản thân và lắng nghe bạn bè một cách hiệu quả."
                type="Video"
              />
              <ResourceCard
                icon={<FileText className="resource-icon" />}
                title="Nhật Ký Tình Bạn"
                description="Công cụ để theo dõi và phản ánh về các mối quan hệ bạn bè của bạn."
                type="Sổ tay"
              />
              <ResourceCard
                icon={<ExternalLink className="resource-icon" />}
                title="Tìm Kiếm Nhóm Hỗ Trợ"
                description="Hướng dẫn tìm kiếm và tham gia các nhóm bạn bè có cùng sở thích và mối quan tâm."
                type="Hướng dẫn"
              />
            </div>
          </div>

          <div
            className={`tab-content ${
              activeTab === "relationship" ? "active" : ""
            }`}
            id="relationship-tab"
          >
            <h2 className="tab-title">Tài Nguyên về Tình Cảm</h2>

            <div className="resources-grid">
              <ResourceCard
                icon={<Heart className="resource-icon" />}
                title="Hiểu về Các Mối Quan Hệ Tình Cảm"
                description="Tìm hiểu về các giai đoạn phát triển của mối quan hệ và cách xây dựng tình yêu lành mạnh."
                type="Bài viết"
              />
              <ResourceCard
                icon={<Video className="resource-icon" />}
                title="Quản Lý Cảm Xúc trong Tình Yêu"
                description="Cách xử lý các cảm xúc phức tạp và xây dựng sự tin tưởng trong mối quan hệ."
                type="Video"
              />
              <ResourceCard
                icon={<FileText className="resource-icon" />}
                title="Sổ Tay Tình Yêu"
                description="Công cụ để theo dõi và phản ánh về mối quan hệ tình cảm của bạn."
                type="Sổ tay"
              />
              <ResourceCard
                icon={<ExternalLink className="resource-icon" />}
                title="Tìm Kiếm Sự Giúp Đỡ Chuyên Môn"
                description="Hướng dẫn tìm kiếm tư vấn viên tình cảm và các nguồn hỗ trợ khác."
                type="Hướng dẫn"
              />
            </div>
          </div>

          <div
            className={`tab-content ${activeTab === "study" ? "active" : ""}`}
            id="study-tab"
          >
            <h2 className="tab-title">Tài Nguyên về Học Tập</h2>

            <div className="resources-grid">
              <ResourceCard
                icon={<Book className="resource-icon" />}
                title="Quản Lý Áp Lực Học Tập"
                description="Các chiến lược để giảm căng thẳng và tăng hiệu quả học tập."
                type="Bài viết"
              />
              <ResourceCard
                icon={<Video className="resource-icon" />}
                title="Kỹ Năng Quản Lý Thời Gian"
                description="Cách lập kế hoạch và tổ chức thời gian học tập hiệu quả."
                type="Video"
              />
              <ResourceCard
                icon={<FileText className="resource-icon" />}
                title="Sổ Tay Học Tập"
                description="Công cụ để theo dõi tiến độ học tập và đặt mục tiêu."
                type="Sổ tay"
              />
              <ResourceCard
                icon={<Headphones className="resource-icon" />}
                title="Nhạc Tập Trung Học Tập"
                description="Danh sách nhạc được chọn lọc để tăng khả năng tập trung khi học."
                type="Audio"
              />
            </div>
          </div>

          <div
            className={`tab-content ${activeTab === "social" ? "active" : ""}`}
            id="social-tab"
          >
            <h2 className="tab-title">Tài Nguyên về Mạng Xã Hội</h2>

            <div className="resources-grid">
              <ResourceCard
                icon={<Globe className="resource-icon" />}
                title="Sử Dụng Mạng Xã Hội Lành Mạnh"
                description="Cách sử dụng mạng xã hội một cách cân bằng và có lợi cho sức khỏe tâm lý."
                type="Bài viết"
              />
              <ResourceCard
                icon={<Video className="resource-icon" />}
                title="Bảo Vệ Bản Thân Trên Mạng"
                description="Các biện pháp bảo vệ quyền riêng tư và an toàn khi sử dụng mạng xã hội."
                type="Video"
              />
              <ResourceCard
                icon={<FileText className="resource-icon" />}
                title="Nhật Ký Sử Dụng Mạng Xã Hội"
                description="Công cụ để theo dõi thời gian và tác động của việc sử dụng mạng xã hội."
                type="Sổ tay"
              />
              <ResourceCard
                icon={<ExternalLink className="resource-icon" />}
                title="Tài Nguyên Hỗ Trợ Trực Tuyến"
                description="Danh sách các nguồn hỗ trợ và cộng đồng trực tuyến đáng tin cậy."
                type="Hướng dẫn"
              />
            </div>
          </div>
        </div>

        <section className="self-care-section">
          <h2 className="section-title">Thực Hành Tự Chăm Sóc</h2>
          <div className="self-care-grid">
            <div className="self-care-card">
              <h3 className="self-care-title">Tự Chăm Sóc Thể Chất</h3>
              <ul className="self-care-list">
                <li>Tập thể dục thường xuyên</li>
                <li>Ngủ đủ giấc</li>
                <li>Dinh dưỡng cân bằng</li>
                <li>Uống đủ nước</li>
                <li>Nghỉ ngơi khỏi màn hình</li>
              </ul>
            </div>

            <div className="self-care-card">
              <h3 className="self-care-title">Tự Chăm Sóc Tinh Thần</h3>
              <ul className="self-care-list">
                <li>Thiền chánh niệm</li>
                <li>Viết nhật ký</li>
                <li>Thể hiện sáng tạo</li>
                <li>Học kỹ năng mới</li>
                <li>Đặt ranh giới</li>
              </ul>
            </div>

            <div className="self-care-card">
              <h3 className="self-care-title">Tự Chăm Sóc Xã Hội</h3>
              <ul className="self-care-list">
                <li>Kết nối với bạn bè</li>
                <li>Tham gia nhóm hỗ trợ</li>
                <li>Tình nguyện</li>
                <li>Yêu cầu giúp đỡ khi cần</li>
                <li>Đặt ranh giới lành mạnh</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="chat-cta">
          <h2 className="section-title">Cần Đánh Giá Sức Khỏe Tâm Lý?</h2>
          <p className="cta-description">
            Thực hiện đánh giá tâm lý của chúng tôi để hiểu rõ hơn về sức khỏe
            tâm lý của bạn và nhận các đề xuất được cá nhân hóa.
          </p>
          <Link to="/assessment" className="primary-button">
            Thực Hiện Đánh Giá
          </Link>
        </section>
      </div>
    </main>
  );
}

export default Resources;
