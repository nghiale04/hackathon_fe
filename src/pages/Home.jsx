import { Link } from "react-router-dom";
import {
  MessageCircle,
  BookOpen,
  LifeBuoy,
  BarChart3,
} from "lucide-react";
import FeatureCard from "../components/FeartureCard";
import Header from "../components/Header";
import "../styles/home.css";
import React from 'react';
import Chatbot from '../components/Chatbot';

function Home() {
  return (
    <>
      <Header />
      <main className="main">
        <section className="hero">
          <h2 className="hero-title">Người bạn đồng hành tâm lý của bạn</h2>
          <p className="hero-description">
            Một không gian an toàn để chia sẻ, tìm kiếm nguồn lực và nhận hỗ trợ
            cho các vấn đề về căng thẳng, trầm cảm và bắt nạt trên mạng.
          </p>
          <div className="hero-buttons">
            <Link to="/assessment" className="primary-button">
              Bắt đầu đánh giá
            </Link>
            <Link to="/resources" className="secondary-button">
              Khám phá tài nguyên
            </Link>
          </div>
        </section>

        <section className="features">
          <FeatureCard
            icon={<MessageCircle className="feature-icon" />}
            title="Đánh giá sức khỏe tâm thần"
            description="Thực hiện đánh giá tâm lý để hiểu rõ hơn về sức khỏe tâm thần của bạn và nhận các đề xuất cá nhân hóa."
          />
          <FeatureCard
            icon={<BookOpen className="feature-icon" />}
            title="Tài nguyên hữu ích"
            description="Truy cập các bài viết, video và bài tập được thiết kế để giúp đỡ với căng thẳng, trầm cảm và bắt nạt trên mạng."
          />
          <FeatureCard
            icon={<LifeBuoy className="feature-icon" />}
            title="Hỗ trợ khẩn cấp"
            description="Truy cập nhanh vào các đường dây nóng khủng hoảng và sự giúp đỡ chuyên nghiệp khi bạn cần hỗ trợ ngay lập tức."
          />
          <FeatureCard
            icon={<BarChart3 className="feature-icon" />}
            title="Đề xuất cá nhân hóa"
            description="Nhận các gợi ý được điều chỉnh cho hình ảnh, video và địa điểm để hỗ trợ sức khỏe tâm thần của bạn."
          />
        </section>

        <section className="help-section">
          <h2 className="section-title">Chúng tôi có thể giúp gì cho bạn</h2>
          <div className="help-grid">
            <div className="help-item">
              <h3 className="help-title">Căng thẳng & Lo âu</h3>
              <p className="help-description">
                Học các kỹ thuật quản lý căng thẳng, thực hành chánh niệm và
                phát triển cơ chế đối phó lành mạnh.
              </p>
              <ul className="help-list">
                <li>Bài tập thở có hướng dẫn</li>
                <li>Kỹ thuật giảm căng thẳng</li>
                <li>Chiến lược cải thiện giấc ngủ</li>
              </ul>
            </div>
            <div className="help-item">
              <h3 className="help-title">Trầm cảm</h3>
              <p className="help-description">
                Tìm kiếm sự hỗ trợ, nguồn lực và công cụ để giúp vượt qua trầm
                cảm và xây dựng khả năng phục hồi.
              </p>
              <ul className="help-list">
                <li>Theo dõi tâm trạng và viết nhật ký</li>
                <li>Bài tập tâm lý tích cực</li>
                <li>Kết nối với sự giúp đỡ chuyên nghiệp</li>
              </ul>
            </div>
            <div className="help-item">
              <h3 className="help-title">Mạng xã hội</h3>
              <p className="help-description">
                Nhận hướng dẫn về cách xử lý tình huống bắt nạt trên mạng, bảo
                vệ bản thân trực tuyến và tìm kiếm sự hỗ trợ.
              </p>
              <ul className="help-list">
                <li>Chiến lược ghi chép</li>
                <li>Hướng dẫn chặn và báo cáo</li>
                <li>Xây dựng khả năng phục hồi kỹ thuật số</li>
              </ul>
            </div>
            <div className="help-item">
              <h3 className="help-title">Dành cho mọi người</h3>
              <p className="help-description">
                Truy cập các nguồn lực sức khỏe tâm thần chung và công cụ hỗ trợ
                luôn có sẵn khi bạn cần.
              </p>
              <ul className="help-list">
                <li>Đánh giá tâm lý</li>
                <li>Tài nguyên giáo dục</li>
                <li>Đề xuất tự chăm sóc</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      
    </>
  );
}

export default Home;
