import { useEffect, useState } from "preact/hooks";

import { t } from "../../../../services/i18n.js";
import server from "../../../../services/server.js";
import Button from "../../../react/Button.js";

interface NativeInventory {
    profiles: { id: string; name: string; available: boolean; error?: string; setup: string; notes: boolean }[];
}

export default function NativeAgentInventory({ onRefresh }: { onRefresh: () => void }) {
    const [inventory, setInventory] = useState<NativeInventory>();
    const [error, setError] = useState(false);
    const [generation, setGeneration] = useState(0);
    useEffect(() => {
        let disposed = false;
        void server.post<NativeInventory>("native-agents/inventory", { refresh: generation > 0 })
            .then(value => { if (!disposed) { setInventory(value); setError(false); if (generation) onRefresh(); } })
            .catch(() => { if (!disposed) setError(true); });
        return () => { disposed = true; };
    }, [generation]);
    return <div>
        <p>{t("llm.native_agent_help")}</p>
        <Button size="small" text={t("llm.native_agent_refresh")} onClick={() => setGeneration(value => value + 1)} />
        {error && <p role="alert">{t("llm.native_agent_inventory_error")}</p>}
        <ul>{inventory?.profiles.map(profile => <li key={profile.id}>
            <strong>{profile.name}</strong> — {profile.available ? t("llm.native_agent_available") : profile.error}
            {!profile.notes && <span> · {t("llm.native_agent_no_notes")}</span>}
        </li>)}</ul>
    </div>;
}
