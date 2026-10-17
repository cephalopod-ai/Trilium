import "./PdfAttachments.css";

import { t } from "../../../services/i18n";
import { formatSize } from "../../../services/utils";
import { useActiveNoteContext, useGetContextData, useNoteProperty } from "../../react/hooks";
import Button from "../../react/Button";
import Icon from "../../react/Icon";
import RightPanelWidget from "../RightPanelWidget";

interface AttachmentInfo {
    id: string;
    filename: string;
    size: number;
}

export default function PdfAttachments() {
    const { note } = useActiveNoteContext();
    const noteType = useNoteProperty(note, "type");
    const noteMime = useNoteProperty(note, "mime");
    const attachmentsData = useGetContextData("pdfAttachments");

    if (noteType !== "file" || noteMime !== "application/pdf") {
        return null;
    }

    if (!attachmentsData || attachmentsData.attachments.length === 0) {
        return null;
    }

    return (
        <RightPanelWidget id="pdf-attachments" title={t("pdf.attachments", { count: attachmentsData.attachments.length })}>
            <div className="pdf-attachments-list">
                {attachmentsData.attachments.map((attachment) => (
                    <PdfAttachmentItem
                        key={attachment.id}
                        attachment={attachment}
                        onDownload={attachmentsData.downloadAttachment}
                    />
                ))}
            </div>
        </RightPanelWidget>
    );
}

function PdfAttachmentItem({
    attachment,
    onDownload
}: {
    attachment: AttachmentInfo;
    onDownload: (id: string) => void;
}) {
    const sizeText = formatSize(attachment.size);

    return (
        <Button className="pdf-attachment-item" kind="lowProfile" onClick={() => onDownload(attachment.id)} text={<>
            <Icon icon="bx bx-paperclip" />
            <span className="pdf-attachment-info">
                <span className="pdf-attachment-filename">{attachment.filename}</span>
                <span className="pdf-attachment-size">{sizeText}</span>
            </span>
            <Icon icon="bx bx-download" />
        </>} />
    );
}
