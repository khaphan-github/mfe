# TinyMCE Angular

là một gói tích hợp cho Angular để sử dụng trình soạn thảo văn bản TinyMCE. Trình soạn thảo này giúp dễ dàng tích hợp và quản lý nội dung có định dạng trong ứng dụng Angular.

# Self-hosted

- TinyMCE có 1 phiên bản lưu trữ (self-hosted) cho phép tải và cài đặt trình soạn thảo trên máy chủ của mình thay vì sử dụng dịch vụ cloud. Điều này giúp kiểm soát hoàn toàn việc triển khai và cấu hình.

## Non-Premium
1. preview
2. importcss
3. searchreplace
4. autolink
5. autosave
6. save
7. directionality
8. code
9. visualblocks
10. fullscreen
11. image
12. link
13. media
14. template
15. codesample
16. table
17. charmap
18. pagebreak
19. nonbreaking
20. anchor
21. insertdatetime
22. advlist
23. lists
24. wordcount
25. help
26. quickbars
27. emoticons

## Premium
1. ****Advanced Code Editor:**** [Advanced Code Editor | Edit HTML Easily | TinyMCE](https://www.tiny.cloud/tinymce/features/advanced-code-editor/#advanced-code-editor-demo)
2. ****Advanced Tables:**** [Advanced Tables | TinyMCE](https://www.tiny.cloud/tinymce/features/advanced-tables/#advanced-tables-demo)
3. ****Case Change:**** [Case Change | TinyMCE](https://www.tiny.cloud/tinymce/features/case-change/)
4. ****Checklist:**** [Checklist | Add Checklist to your content easily | TinyMCE](https://www.tiny.cloud/tinymce/features/checklist/)
5. ****Enhanced Image Editing:**** [Enhanced Image Editing | TinyMCE](https://www.tiny.cloud/tinymce/features/enhanced-image-editing/)
6. ****Enhanced Media Embed:**** [Enhanced Media Embed | TinyMCE](https://www.tiny.cloud/tinymce/features/enhanced-media-embed/)
7. ****Export:**** [Export as PDF | Save document as PDF | TinyMCE](https://www.tiny.cloud/tinymce/features/export/)
8. ****Format Painter:**** [Format Painter | TinyMCE](https://www.tiny.cloud/tinymce/features/format-painter/)
9. ****Format Painter:**** [Format Painter | TinyMCE](https://www.tiny.cloud/tinymce/features/format-painter/)
10. ****Inline CSS:**** [Inline CSS generator | TinyMCE](https://www.tiny.cloud/tinymce/features/inline-css/)
11. ****Merge Tags:**** [Merge tags | Personalization tokens insertion | TinyMCE](https://www.tiny.cloud/tinymce/features/merge-tags/)
12. ****Page Embed:**** [Embed page | Iframe webpage insertion | TinyMCE](https://www.tiny.cloud/tinymce/features/page-embed/)
13. ****Permanent Pen:**** [Permanent Pen | Predefined text formatting | TinyMCE](https://www.tiny.cloud/tinymce/features/permanent-pen/)
14. ****PowerPaste:**** [TinyMCE PowerPaste | Paste with formatting from Word, Excel, Google Docs | TinyMCE](https://www.tiny.cloud/tinymce/features/powerpaste/)
15. ****Skins & Icons Pack:**** [Skins and icons packs | Customize your editor UI | TinyMCE](https://www.tiny.cloud/tinymce/features/skins-and-icon-packs/)
16. ****Table of Contents:**** [Automatic table of contents | Content index insertion | TinyMCE](https://www.tiny.cloud/tinymce/features/table-of-contents/)

Collaboration:
17. ****Comments:**** [Comments | Real-time commenting system | TinyMCE](https://www.tiny.cloud/tinymce/features/comments/)
18. ****Mentions:**** [Mentions | User tags | TinyMCE](https://www.tiny.cloud/tinymce/features/mentions/)

Add ons
1. ****AI Assistant:**** [AI Assistant | Enhance your text editor with AI | TinyMCE](https://www.tiny.cloud/tinymce/features/ai-integration/)
2. ****Tiny Drive:**** [Drive | Cloud file storage | TinyMCE](https://www.tiny.cloud/drive/)

## Issues
- Phiên bản non-premium
    1. Ưu điểm
        1. Sự dụng được hầu hết các plugins và core
        2. Đang dùng self-hosted, không cần lấy js của các plugins từ server cloud tiny
        3. Dùng miễn phí
    2. Nhược điểm
        1. Chưa tích hợp
            1. Tiny drive
            2. Mentions
            3. Comments
            4. Ai assistant
        2. Chỉ dùng các tính năng ở mức cơ bản
- Phiên bản premium
    1. Ưu điểm
        1. Sử dụng được đầy đủ các plugins nâng cao
        2. Được cập nhật phát triển các tính năng từ Tiny
        3. Tích hợp hết những thứ mà non-premium chưa hỗ trợ
    2. Nhược điểm
        1. Tốn phí dịch vụ

## Properties

| Name         |  Type         | Description |
| apiKey       | string        | Nó cấp quyền truy cập vào tất cả các Tính năng cao cấp. |
| cloudChannel | string        | Chỉ định cloud cần dùng của thư viện |
| disabled     | boolean       | Tắt tính năng editor |
| id           | string        | Id là 1 uuid tự sinh không cần thiết phải truyền |
| init         | TInit         | Khởi tạo và cấu hình |
| plugins      | TPlugins      | Các plugins cần dùng |
| toolbar      | TToolbar      | Thanh công cụ phụ thuộc vào các plugins |
| tagName      | string        | Định nghĩa lại HTML Element (require inline phải true) |
| inline       | boolean       | Chế độ inline cho người dùng có thể edit view page |
| outputFormat | TOutputFormat | Giá trị nội dung là text hoặc html |

- editorContent: Giá trị binding
- onInitEditor: Khởi tạo instance cho editor

## Method

- editorContentChange: Lắng nghe sự kiện thay đổi
