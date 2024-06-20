"use strict";

const mount = require("koa-mount");

const companyController = require("../controllers/company/company.controller");
const testimonialController = require("../controllers/testimonial/testimonial.controller");
const faqController = require("../controllers/faq/faq.controller");
const queryInfoController = require("../controllers/query/queryInfo.controller");
const leadsController = require("../controllers/leads/leads.controller");
const pdfController = require("../controllers/pdf/pdf.controller");
const mailerController = require("../controllers/mailer/mailer.controller");
const insuranceFinancingController = require("../controllers/insurance_financing/insuranceFinancing.controller");
const couponsController = require("../controllers/coupon/coupons.controller");
const reportsController = require("../controllers/report/reports.controller");
const supportController = require("../controllers/support/support.controller");
const testDriveController = require("../controllers/query/testDrive.controller");
const queryExecutorController = require("../controllers/query/queryExecutor.controller");
const debtsController = require("../controllers/debts/debts.controller");
const partnerIncomingController = require("../controllers/billing/partnerIncoming.controller");
const ownersReviewController = require("../controllers/owners_review/ownersReview.controller");
const analyticsControllers = require("../controllers/analytics/analytics.controller");
const utilizationLogsController = require("../controllers/utilization-log/utilization-log.controller");
const indicateAndEarnController = require("../controllers/indicate-and-earn/indicateAndEarn.controller");
const userConsentController = require("../controllers/notification/userConsent.controller");

module.exports = function (app) {
  const __public = app.application.routes.public;
  const __protected = app.application.routes.protected;

  //PUBLIC ROUTES
  app.use(mount("/auth", __public.authRoutes.routes()));
  app.use(mount("/api/utils", __public.utilsRoutes.routes()));
  app.use(mount("/api/notification", __public.notificationRoutes.routes()));
  app.use(
    mount(
      "/api/public-notification",
      __public.publicNotificationRoutes.routes()
    )
  );
  app.use(mount("/api/package", __public.packageRoutes.routes()));
  app.use(mount("/api/coupon", __public.couponRoutes.routes()));
  app.use(mount("/api/voucher", __public.voucherRoutes.routes()));
  app.use(mount("/api/test-drive", __public.testDriveRoutes.routes()));
  app.use(mount("/api/front-log", __public.frontLogRoutes.routes()));
  app.use(mount("/api/plan", __public.planRoutes.routes()));
  app.use(mount("/api/recognition", __public.recognitionRoutes.routes()));
  app.use(mount("/api/version", __public.versionRoutes.routes()));
  app.use(mount("/api/quiz", __public.quizRoutes.routes()));
  app.use(mount("/api/quiz-answer", __public.quizAnswerRoutes.routes()));
  app.use(mount("/api/user-know", __public.userKnowRoutes.routes()));
  app.use(mount("/api/term", __public.termRoutes.routes()));
  app.use(debtsController);
  app.use(companyController);
  app.use(testimonialController);
  app.use(faqController);
  app.use(queryInfoController);
  app.use(pdfController);
  app.use(mailerController);
  app.use(couponsController);
  app.use(reportsController);
  app.use(supportController);
  app.use(testDriveController);
  app.use(queryExecutorController);
  app.use(partnerIncomingController);
  app.use(ownersReviewController);
  app.use(analyticsControllers);
  app.use(utilizationLogsController);
  app.use(indicateAndEarnController);
  app.use(userConsentController);

  //PARTIALLY SECURE ROUTES
  app.use(mount("/api/user", __public.userRoutes.routes()));
  app.use(mount("/api/query", __public.queriesRoutes.routes()));
  app.use(mount("/api/settings", __public.settingsRoutes.routes()));
  app.use(mount("/api/konduto", __public.kondutoRoutes.routes()));
  app.use(mount("/api/subscription", __public.subscriptionRoutes.routes()));
  app.use(mount("/api/vehicle", __public.vehicularRoutes.routes()));
  app.use(mount("/api/payment", __public.paymentRoutes.routes()));
  app.use(mount("/api/price-table", __public.priceTableRoutes.routes()));

  app.use(insuranceFinancingController);
  app.use(leadsController);

  //PROTECTION LAYER
  app.use(
    app.application.middlewares.authMiddleware.basicAuthenticationMiddleware
  );
  //FULLY SECURE ROUTES
  app.use(mount("/api/person", __public.personInformationRoutes.routes()));
  app.use(mount("/api/invoice", __public.invoiceRoutes.routes()));
  app.use(mount("/api/log", __public.logRoutes.routes()));
  app.use(mount("/api/billing", __public.billingRoutes.routes()));
  app.use(mount("/api/query-composer", __public.queryComposerRoutes.routes()));
  app.use(mount("/api/service", __public.serviceRoutes.routes()));
  app.use(mount("/api/nfes", __public.nfesRoutes.routes()));
  app.use(mount("/api/queryContext", __public.queryContextRoutes.routes()));
  app.use(
    mount(
      "/api/vehicular-monitoring",
      __public.vehicularMonitoringRoutes.routes()
    )
  );
  app.use(mount("/api/feedback", __public.feedbackRoutes.routes()));
  app.use(
    mount("/api/indicate-template", __public.indicateTemplateRoutes.routes())
  );
  app.use(mount("/api/indication", __public.indicationRoutes.routes()));
  app.use(
    mount("/api/control-navigation", __public.controlNavigationRoutes.routes())
  );

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //        #####            ONLY INTERNAL ACCESS AND ADMINISTRATIVE PERMISSION      #####                  //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  //PROTECTION LAYER FOR SUPPER USERS - MOST SECURE
  app.use(
    app.application.middlewares.authSupperUserMiddleware.supperMiddleware
  );

  app.use(mount("/api/protected/user", __protected.userRoutes.routes()));
  app.use(mount("/api/protected/query", __protected.queriesRoutes.routes()));
  app.use(mount("/api/protected/payment", __protected.paymentRoutes.routes()));
  app.use(
    mount("/api/protected/price-table", __protected.priceTableRoutes.routes())
  );
  app.use(mount("/api/protected/service", __protected.serviceRoutes.routes()));
  app.use(
    mount(
      "/api/protected/query-composer",
      __protected.queryComposerRoutes.routes()
    )
  );
  app.use(mount("/api/protected/billing", __protected.billingRoutes.routes()));
  app.use(
    mount(
      "/api/protected/system-notification",
      __protected.systemNotificationRoutes.routes()
    )
  );
  app.use(mount("/api/protected/voucher", __protected.voucherRoutes.routes()));
  app.use(mount("/api/protected/coupon", __protected.couponRoutes.routes()));
  app.use(
    mount("/api/protected/vehicle", __protected.vehicularRoutes.routes())
  );
  app.use(
    mount("/api/protected/service-log", __protected.serviceLogRoutes.routes())
  );
  app.use(mount("/api/protected/partner", __protected.partnerRoutes.routes()));
  app.use(mount("/api/protected/balance", __protected.balanceRoutes.routes()));
  app.use(mount("/api/protected/term", __protected.termRoutes.routes()));
  app.use(mount("/api/protected/nfes", __protected.nfesRoutes.routes()));
  app.use(
    mount("/api/protected/commission", __protected.commissionRoutes.routes())
  );
  app.use(mount("/api/protected/akna", __protected.aknaRoutes.routes()));
  app.use(
    mount(
      "/api/protected/recommendation",
      __protected.recommendationRoutes.routes()
    )
  );
  app.use(mount("/api/protected/invoice", __protected.invoiceRoutes.routes()));
  app.use(
    mount(
      "/api/protected/payment-error-log",
      __protected.paymentErrorLogRoutes.routes()
    )
  );
  app.use(
    mount(
      "/api/protected/subscription",
      __protected.subscriptionRoutes.routes()
    )
  );
  app.use(mount("/api/protected/plan", __protected.planRoutes.routes()));
  app.use(mount("/api/protected/quiz", __protected.quizRoutes.routes()));
  app.use(
    mount("/api/protected/quiz-answer", __protected.quizAnswerRoutes.routes())
  );
  app.use(
    mount("/api/protected/user-know", __protected.userKnowRoutes.routes())
  );
  app.use(
    mount("/api/protected/feedback", __protected.feedbackRoutes.routes())
  );
  app.use(
    mount(
      "/api/protected/indicate-template",
      __protected.indicateTemplateRoutes.routes()
    )
  );
  app.use(
    mount("/api/protected/indication", __protected.indicationRoutes.routes())
  );
  app.use(
    mount(
      "/api/whatsapp-data-assignment",
      __protected.popupAssignmentRoutes.routes()
    )
  );
};
