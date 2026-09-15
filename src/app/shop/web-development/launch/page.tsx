import WebPackagePage from "@/components/dashboard components/webPackages";

import {
  webPackages,
  type WebPackage,
} from "@/lib/fynaro/web-development/packages";

function makeSerializablePackage(
  packageData: WebPackage
) {
  return {
    ...packageData,

    icon: undefined,

    addons: packageData.addons.map(
      (addon) => {
        const {
          icon: _icon,
          ...serializableAddon
        } = addon;

        return serializableAddon;
      }
    ),
  };
}

export default function LaunchPage() {
  return (
    <WebPackagePage
      packageData={makeSerializablePackage(
        webPackages.launch
      )}
    />
  );
}