export function wamoDirectStatus() {
  return {
    route: "wamo_direct_psd2",
    implementedForLiveReads: false,
    defaultRoute: "Use Enable Banking ASPSP lookup first for Wamo.",
    fallbackRule: "Use direct Wamo/Salt Edge Berlin Group PSD2 only if Wamo is not available through the chosen aggregator and RB has approved TPP certificate/client setup.",
    paymentInitiationEnabled: false,
  };
}
