# Graph Report - .  (2026-04-10)

## Corpus Check
- 2254 files ¡¤ ~0 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 17128 nodes ¡¤ 53123 edges ¡¤ 743 communities detected
- Extraction: 31% EXTRACTED ¡¤ 69% INFERRED ¡¤ 0% AMBIGUOUS ¡¤ INFERRED: 36621 edges (avg confidence: 0.5)
- Token cost: 0 input ¡¤ 0 output

## God Nodes (most connected - your core abstractions)
1. `sqlite3_free()` - 428 edges
2. `push()` - 250 edges
3. `assert()` - 227 edges
4. `map()` - 187 edges
5. `sqlite3VdbeExec()` - 185 edges
6. `Token()` - 181 edges
7. `Token()` - 181 edges
8. `forEach()` - 171 edges
9. `sqlite3_mutex_held()` - 162 edges
10. `get()` - 158 edges

## Surprising Connections (you probably didn't know these)
- `default()` --calls--> `processCreateParams()`  [INFERRED]
  C:\Users\MECHREVO\Desktop\opencode-peer-session-relay\packages\relay-plugin\node_modules\zod\src\v3\types.ts ¡ú C:\Users\MECHREVO\Desktop\opencode-peer-session-relay\packages\relay-plugin\node_modules\zod\v3\types.js
- `brand()` --calls--> `processCreateParams()`  [INFERRED]
  C:\Users\MECHREVO\Desktop\opencode-peer-session-relay\packages\relay-plugin\node_modules\zod\src\v3\types.ts ¡ú C:\Users\MECHREVO\Desktop\opencode-peer-session-relay\packages\relay-plugin\node_modules\zod\v3\types.js
- `custom()` --calls--> `superRefine()`  [INFERRED]
  C:\Users\MECHREVO\Desktop\opencode-peer-session-relay\packages\relay-plugin\node_modules\zod\v3\types.js ¡ú C:\Users\MECHREVO\Desktop\opencode-peer-session-relay\packages\relay-plugin\node_modules\zod\src\v3\types.ts
- `safeParse()` --calls--> `handleResult()`  [INFERRED]
  C:\Users\MECHREVO\Desktop\opencode-peer-session-relay\packages\relay-plugin\node_modules\zod\src\v3\types.ts ¡ú C:\Users\MECHREVO\Desktop\opencode-peer-session-relay\packages\relay-plugin\node_modules\zod\v3\types.js
- `safeParseAsync()` --calls--> `handleResult()`  [INFERRED]
  C:\Users\MECHREVO\Desktop\opencode-peer-session-relay\packages\relay-plugin\node_modules\zod\src\v3\types.ts ¡ú C:\Users\MECHREVO\Desktop\opencode-peer-session-relay\packages\relay-plugin\node_modules\zod\v3\types.js

## Communities

### Community 0 - "Community 0"
Cohesion: 0.0
Nodes (3902): absFunc(), accessPayload(), accessPayloadChecked(), actionName(), addAggInfoColumn(), addAggInfoFunc(), addArgumentToVtab(), addModuleArgument() (+3894 more)

### Community 1 - "Community 1"
Cohesion: 0.0
Nodes (2547): abortParsingListOrMoveToNextToken(), accessKind(), accessPrivateIdentifier(), add(), addDefaultValueAssignmentForBindingPattern(), addDefaultValueAssignmentForInitializer(), addDefaultValueAssignmentIfNeeded(), addDefaultValueAssignmentsIfNeeded() (+2539 more)

### Community 2 - "Community 2"
Cohesion: 0.0
Nodes (1005): accessKind(), accessPrivateIdentifier(), addDefaultValueAssignmentForBindingPattern(), addDefaultValueAssignmentForInitializer(), addDefaultValueAssignmentIfNeeded(), addDefaultValueAssignmentsIfNeeded(), addPerformanceData(), addReplacementSpans() (+997 more)

### Community 3 - "Community 3"
Cohesion: 0.01
Nodes (612): addCompletionEntriesFromPaths(), addCompletionEntriesFromPathsOrExportsOrImports(), addMissingSourceMapFile(), addNewFileToTsconfig(), addSourceInfoToSourceMap(), allKeysStartWithDot(), applyChangesInOpenFiles(), applySafeListWorker() (+604 more)

### Community 4 - "Community 4"
Cohesion: 0.01
Nodes (608): addEnumMemberDeclaration(), addMethodDeclaration(), addMissingMemberInJs(), addNodeOutliningSpans(), addOutliningForLeadingCommentsForNode(), addOutliningForLeadingCommentsForPos(), addPropertyDeclaration(), addRegionOutliningSpans() (+600 more)

### Community 5 - "Community 5"
Cohesion: 0.01
Nodes (519): add(), addConvertToAsyncFunctionDiagnostics(), addDiagnosticsPerformanceData(), addFilesToNonInferredProject(), addGeneratedFileWatch(), addMissingFileRoot(), addMissingFileWatcher(), addNodeFactoryPatcher() (+511 more)

### Community 6 - "Community 6"
Cohesion: 0.01
Nodes (451): addClassStaticThisReferences(), addConstructorReferences(), addImplementationReferences(), addJSDocTags(), addReference(), addUndefinedToOptionalProperty(), addUndefinedType(), annotate() (+443 more)

### Community 7 - "Community 7"
Cohesion: 0.01
Nodes (144): Backup, Binder, BindMap, CompareBackup, CompareDatabase, CompareStatement, CS, Cursor (+136 more)

### Community 8 - "Community 8"
Cohesion: 0.02
Nodes (419): abortParsingListOrMoveToNextToken(), addRelatedInfo(), allowConditionalTypesAnd(), allowInAnd(), attachFileToDiagnostics(), canFollowContextualOfKeyword(), canFollowExportModifier(), canFollowGetOrSetKeyword() (+411 more)

### Community 9 - "Community 9"
Cohesion: 0.01
Nodes (406): addChildrenRecursively(), addExportToChanges(), addLeafNode(), addNodeWithRecursiveChild(), addNodeWithRecursiveInitializer(), addTrackedEs5Class(), allEditsBeforePos(), applyChange() (+398 more)

### Community 10 - "Community 10"
Cohesion: 0.01
Nodes (118): runBaseTests(), startViteNode(), ExperimentalClientTasks, pick(), rewrite(), BaseCoverageProvider, createVitestExecutor(), findMockRedirect() (+110 more)

### Community 11 - "Community 11"
Cohesion: 0.01
Nodes (84): and(), array(), brand(), catch(), Class, createZodEnum(), custom(), datetimeRegex() (+76 more)

### Community 12 - "Community 12"
Cohesion: 0.02
Nodes (288): absolutePositionOfStartOfLine(), allFilesAreJsOrDts(), applyCodeActionCommand(), applyEdits(), change(), charCount(), charOffsetToLineInfo(), collectChanges() (+280 more)

### Community 13 - "Community 13"
Cohesion: 0.02
Nodes (229): addCommonjsExport(), addDefiniteAssignmentAssertion(), addEmitFlags(), addEmitFlagsRecursively(), addEs6Export(), addExport(), addFunctionDeclaration(), addInitializer() (+221 more)

### Community 14 - "Community 14"
Cohesion: 0.01
Nodes (36): App, Auth, Auth2, Command, Config, Config2, Control, Event (+28 more)

### Community 15 - "Community 15"
Cohesion: 0.02
Nodes (66): BaseReporter, BasicReporter, BlobReporter, capitalize(), capturePrintError(), countTestErrors(), DefaultReporter, divider() (+58 more)

### Community 16 - "Community 16"
Cohesion: 0.02
Nodes (181): addEmitHelper(), addEmitHelpers(), addInternalEmitFlags(), addRange(), addSyntheticLeadingComment(), addSyntheticTrailingComment(), appendIfUnique(), childIsDecorated() (+173 more)

### Community 17 - "Community 17"
Cohesion: 0.02
Nodes (155): addCodeAction(), addImportType(), addNamespaceQualifier(), canCompleteFromNamedBindings(), cast(), coalesceExportsWorker(), codeActionForFix(), codeActionForFixWorker() (+147 more)

### Community 18 - "Community 18"
Cohesion: 0.03
Nodes (95): assertConfigurationModule(), BaseCoverageProvider, BaseSequencer, createChildProcessChannel(), createChildProcessChannel$1(), createError(), createMethodsRPC(), createVmForksPool() (+87 more)

### Community 19 - "Community 19"
Cohesion: 0.02
Nodes (137): addExports(), addExportsInOldFile(), addImportsForMovedSymbols(), addTargetFileImports(), canReuseOldState(), chainBundle(), changesAffectingProgramStructure(), changesAffectModuleResolution() (+129 more)

### Community 20 - "Community 20"
Cohesion: 0.02
Nodes (126): chooseBetterSymbol(), climbPastPropertyAccess(), climbPastPropertyOrElementAccess(), containsOnlyAmbientModules(), convertEntryToCallSite(), createCacheableExportInfoMap(), createCompletionDetails(), createCompletionDetailsForSymbol() (+118 more)

### Community 21 - "Community 21"
Cohesion: 0.02
Nodes (29): check(), Class, custom(), _enum(), extend(), handleIntersectionResults(), _instanceof(), isValidBase64() (+21 more)

### Community 22 - "Community 22"
Cohesion: 0.02
Nodes (13): _gt(), _gte(), _lt(), _lte(), _negative(), _nonnegative(), _nonpositive(), _normalize() (+5 more)

### Community 23 - "Community 23"
Cohesion: 0.03
Nodes (103): addMissingDeclarations(), addMissingMembers(), and(), assertEachIsDefined(), checkEachDefined(), completionInfoFromData(), completionNameForLiteral(), containsNonPublicProperties() (+95 more)

### Community 24 - "Community 24"
Cohesion: 0.06
Nodes (78): checkType(), EndError, findUp(), findUpMultiple(), locatePath(), Node, pLimit(), pLocate() (+70 more)

### Community 25 - "Community 25"
Cohesion: 0.03
Nodes (33): DemoInMemoryAuthProvider, DemoInMemoryClientsStore, DemoInMemoryAuthProvider, DemoInMemoryClientsStore, attemptConnection(), callPaymentConfirmTool(), callThirdPartyAuthTool(), callTool() (+25 more)

### Community 26 - "Community 26"
Cohesion: 0.05
Nodes (26): addCliOptions(), addCommand(), benchmark(), CAC, CACError, collect(), Command, createCLI() (+18 more)

### Community 27 - "Community 27"
Cohesion: 0.04
Nodes (18): Class, clone(), MIMEParams, MIMEType, TextDecoder, TextEncoder, extend(), finalizeIssue() (+10 more)

### Community 28 - "Community 28"
Cohesion: 0.06
Nodes (6): jsonRpcError(), jsonRpcSuccess(), RelayRuntime, renderMessagePart(), sanitizeMessage(), sanitizePublicTask()

### Community 29 - "Community 29"
Cohesion: 0.08
Nodes (9): CommonjsExecutor, EsmExecutor, ExternalModulesExecutor, FileMap, interopCommonJsModule(), IPmask(), IPnumber(), require() (+1 more)

### Community 30 - "Community 30"
Cohesion: 0.08
Nodes (8): createCompletionResult(), getMethodValue(), getZodSchemaObject(), isZodRawShapeCompat(), isZodSchemaInstance(), isZodTypeLike(), McpServer, ResourceTemplate

### Community 31 - "Community 31"
Cohesion: 0.05
Nodes (38): McpError, UrlElicitationRequiredError, ZodAny, ZodArray, ZodBigInt, ZodBoolean, ZodBranded, ZodCatch (+30 more)

### Community 32 - "Community 32"
Cohesion: 0.05
Nodes (4): ClientCredentialsProvider, createPrivateKeyJwtAuth(), PrivateKeyJwtProvider, StaticPrivateKeyJwtProvider

### Community 33 - "Community 33"
Cohesion: 0.09
Nodes (5): Resolver, TaskMessageQueueWithResolvers, TaskResultHandler, TaskSession, TaskStoreWithNotifications

### Community 34 - "Community 34"
Cohesion: 0.05
Nodes (36): App, Auth, Auth2, Command, Config, Config2, Control, Event (+28 more)

### Community 35 - "Community 35"
Cohesion: 0.07
Nodes (6): ancestor(), collectTests(), convertTasksToEvents(), getRawErrsMapFromTsCompile(), Typechecker, TypeCheckError

### Community 36 - "Community 36"
Cohesion: 0.11
Nodes (31): applyBasicAuth(), applyClientAuthentication(), applyPostAuth(), applyPublicAuth(), auth(), authInternal(), buildDiscoveryUrls(), buildWellKnownPath() (+23 more)

### Community 37 - "Community 37"
Cohesion: 0.09
Nodes (3): isPlainObject(), mergeCapabilities(), Protocol

### Community 38 - "Community 38"
Cohesion: 0.06
Nodes (21): AccessDeniedError, CustomOAuthError, InsufficientScopeError, InvalidClientError, InvalidClientMetadataError, InvalidGrantError, InvalidRequestError, InvalidScopeError (+13 more)

### Community 39 - "Community 39"
Cohesion: 0.08
Nodes (3): StreamableHTTPClientTransport, StreamableHTTPError, StreamableHTTPServerTransport

### Community 40 - "Community 40"
Cohesion: 0.11
Nodes (17): callCollectInfoTool(), callCollectInfoWithTask(), callGreetTool(), callMultiGreetTool(), callTool(), callToolTask(), cleanup(), commandLoop() (+9 more)

### Community 41 - "Community 41"
Cohesion: 0.16
Nodes (6): aggregateRunStatus(), createRunId(), deserializeEvidence(), reviewerFinalAcceptanceSatisfied(), serializeEvidence(), TeamStore

### Community 42 - "Community 42"
Cohesion: 0.16
Nodes (3): createRoomCode(), normalizeAlias(), RoomStore

### Community 43 - "Community 43"
Cohesion: 0.15
Nodes (3): createDirectKey(), createThreadId(), ThreadStore

### Community 44 - "Community 44"
Cohesion: 0.11
Nodes (3): SSEClientTransport, SseError, SSEServerTransport

### Community 45 - "Community 45"
Cohesion: 0.1
Nodes (4): deserializeMessage(), ReadBuffer, StdioClientTransport, StdioServerTransport

### Community 46 - "Community 46"
Cohesion: 0.13
Nodes (10): buildUrl(), checkForExistence(), createQuerySerializer(), defaultPathSerializer(), getUrl(), headersEntries(), Interceptors, mergeConfigs() (+2 more)

### Community 47 - "Community 47"
Cohesion: 0.1
Nodes (19): AccessDeniedError, CustomOAuthError, InsufficientScopeError, InvalidClientError, InvalidClientMetadataError, InvalidGrantError, InvalidRequestError, InvalidScopeError (+11 more)

### Community 48 - "Community 48"
Cohesion: 0.21
Nodes (1): WebStandardStreamableHTTPServerTransport

### Community 49 - "Community 49"
Cohesion: 0.13
Nodes (2): InMemoryTaskMessageQueue, InMemoryTaskStore

### Community 50 - "Community 50"
Cohesion: 0.18
Nodes (1): RelayRoomOrchestrator

### Community 51 - "Community 51"
Cohesion: 0.19
Nodes (11): BenchmarkReporter, computeColumnWidths(), createBenchmarkJsonReport(), flattenFormattedBenchmarkReport(), formatNumber(), padRow(), renderBenchmark(), renderBenchmarkItems() (+3 more)

### Community 52 - "Community 52"
Cohesion: 0.12
Nodes (3): createRelayBridgeMcpServer(), RelayMcpService, resolveDatabasePath()

### Community 53 - "Community 53"
Cohesion: 0.12
Nodes (2): $ZodAsyncError, A

### Community 54 - "Community 54"
Cohesion: 0.23
Nodes (1): UriTemplate

### Community 55 - "Community 55"
Cohesion: 0.16
Nodes (4): addIssueToContext(), DIRTY(), makeIssue(), ParseStatus

### Community 56 - "Community 56"
Cohesion: 0.22
Nodes (3): parseArtifacts(), parseMessage(), TaskStore

### Community 57 - "Community 57"
Cohesion: 0.25
Nodes (2): InteractiveOAuthClient, main()

### Community 58 - "Community 58"
Cohesion: 0.22
Nodes (15): convertToLocation(), convertToRelativePath(), diagnosticCategoryName(), flattenDiagnosticMessageText(), formatCodeSpan(), formatColorAndReset(), formatDiag(), formatDiagnostic() (+7 more)

### Community 59 - "Community 59"
Cohesion: 0.21
Nodes (5): loadInstalledRelayPluginConfig(), mergeRelayPluginConfig(), resolveInstalledConfigPath(), resolveInstalledConfigPathFromModuleUrl(), resolveRelayPluginConfig()

### Community 60 - "Community 60"
Cohesion: 0.17
Nodes (1): InMemoryOAuthClientProvider

### Community 61 - "Community 61"
Cohesion: 0.17
Nodes (11): Certificate, Cipher, Decipher, DiffieHellman, ECDH, Hash, Hmac, KeyObject (+3 more)

### Community 62 - "Community 62"
Cohesion: 0.17
Nodes (11): BrotliCompress, BrotliDecompress, Deflate, DeflateRaw, Gunzip, Gzip, Inflate, InflateRaw (+3 more)

### Community 63 - "Community 63"
Cohesion: 0.18
Nodes (1): ZodError

### Community 64 - "Community 64"
Cohesion: 0.21
Nodes (1): A2ARelayHost

### Community 65 - "Community 65"
Cohesion: 0.24
Nodes (3): createMessageId(), MessageStore, shouldRetryMessageInsert()

### Community 66 - "Community 66"
Cohesion: 0.31
Nodes (8): getLiteralValue(), getObjectShape(), isSchemaOptional(), isZ4Schema(), normalizeObjectSchema(), objectFromShape(), safeParse(), safeParseAsync()

### Community 67 - "Community 67"
Cohesion: 0.33
Nodes (11): copy_stemmer(), doubleConsonant(), hasVowel(), isConsonant(), isVowel(), m_eq_1(), m_gt_0(), m_gt_1() (+3 more)

### Community 68 - "Community 68"
Cohesion: 0.27
Nodes (9): createCancellationToken(), findArgumentStringArray(), getLogLevel(), initializeNodeSystem(), parseEventPort(), parseLoggingEnvironmentString(), parseServerMode(), start() (+1 more)

### Community 69 - "Community 69"
Cohesion: 0.33
Nodes (8): constructor(), execSyncAndLog(), getDefaultNPMLocation(), getTypesRegistryFileLocation(), handleRequest(), indent(), loadTypesRegistryFile(), sendResponse()

### Community 70 - "Community 70"
Cohesion: 0.36
Nodes (9): bootstrapRelayWorkflowTeam(), buildSessionTitle(), buildWorkerBootstrapPrompt(), classifyRelayWorkflowSignal(), ensureSessionApi(), extractCreatedSessionID(), normalizeSignalPayload(), summarizeTask() (+1 more)

### Community 71 - "Community 71"
Cohesion: 0.22
Nodes (1): ProxyOAuthServerProvider

### Community 72 - "Community 72"
Cohesion: 0.36
Nodes (6): extractRowArray(), extractRowObject(), inferParameters(), parseTableDefinition(), wrapFactory(), wrapGenerator()

### Community 73 - "Community 73"
Cohesion: 0.22
Nodes (8): AutoImportProviderProject, ConfiguredProject, ExternalProject, InferredProject, OperationCanceledException, ProjectService, ScriptInfo, Session

### Community 74 - "Community 74"
Cohesion: 0.33
Nodes (8): assertType(), DebugTypeMapper, hasInferredType(), isDeclarationWithTypeParameterChildren(), isDeclarationWithTypeParameters(), isPrimitiveLiteralValue(), type(), zipWith()

### Community 75 - "Community 75"
Cohesion: 0.42
Nodes (1): VitestGit

### Community 76 - "Community 76"
Cohesion: 0.44
Nodes (8): detect(), detectPackageManager(), getNameAndVer(), handlePackageManager(), installPackage(), isMetadataYarnClassic(), parsePackageJson(), pathExists()

### Community 77 - "Community 77"
Cohesion: 0.31
Nodes (4): getCurrentEnvironment(), getWorkerState(), waitForImportsToResolve(), waitNextTick()

### Community 78 - "Community 78"
Cohesion: 0.28
Nodes (1): $ZodRegistry

### Community 79 - "Community 79"
Cohesion: 0.28
Nodes (5): mapArtifactUpdateEvent(), mapTaskStatusEvent(), sanitizeArtifact(), sanitizeMessage(), TaskEventHub

### Community 80 - "Community 80"
Cohesion: 0.25
Nodes (7): PerformanceEntry, PerformanceMark, PerformanceMeasure, PerformanceNodeTiming, PerformanceObserver, PerformanceObserverEntryList, PerformanceResourceTiming

### Community 81 - "Community 81"
Cohesion: 0.43
Nodes (6): catchWindowErrors(), getWindowKeys(), isClassLikeName(), populateGlobal(), setup(), setupVM()

### Community 82 - "Community 82"
Cohesion: 0.25
Nodes (1): $ZodFunction

### Community 83 - "Community 83"
Cohesion: 0.25
Nodes (0): 

### Community 84 - "Community 84"
Cohesion: 0.38
Nodes (1): InMemoryEventStore

### Community 85 - "Community 85"
Cohesion: 0.29
Nodes (1): InMemoryTransport

### Community 86 - "Community 86"
Cohesion: 0.43
Nodes (5): separatorArrayExplode(), separatorArrayNoExplode(), separatorObjectExplode(), serializeArrayParam(), serializeObjectParam()

### Community 87 - "Community 87"
Cohesion: 0.29
Nodes (6): Dir, Dirent, ReadStream, Stats, StatsFs, WriteStream

### Community 88 - "Community 88"
Cohesion: 0.29
Nodes (6): Agent, ClientRequest, IncomingMessage, OutgoingMessage, Server, ServerResponse

### Community 89 - "Community 89"
Cohesion: 0.29
Nodes (6): Duplex, PassThrough, Readable, Stream, Transform, Writable

### Community 90 - "Community 90"
Cohesion: 0.38
Nodes (3): datetime(), time(), timeSource()

### Community 91 - "Community 91"
Cohesion: 0.43
Nodes (3): isTransforming(), JSONSchemaGenerator, toJSONSchema()

### Community 92 - "Community 92"
Cohesion: 0.33
Nodes (1): WebSocketClientTransport

### Community 93 - "Community 93"
Cohesion: 0.47
Nodes (4): elicitationCallback(), getTextContent(), question(), run()

### Community 94 - "Community 94"
Cohesion: 0.53
Nodes (4): isPlainObject(), serializeQueryKeyValue(), serializeSearchParams(), stringifyToJsonValue()

### Community 95 - "Community 95"
Cohesion: 0.33
Nodes (5): DefaultDeserializer, DefaultSerializer, Deserializer, GCProfiler, Serializer

### Community 96 - "Community 96"
Cohesion: 0.4
Nodes (2): createRuntimeRpc(), createSafeRpc()

### Community 97 - "Community 97"
Cohesion: 0.33
Nodes (0): 

### Community 98 - "Community 98"
Cohesion: 0.33
Nodes (0): 

### Community 99 - "Community 99"
Cohesion: 0.33
Nodes (1): Doc

### Community 100 - "Community 100"
Cohesion: 0.33
Nodes (1): AuditStore

### Community 101 - "Community 101"
Cohesion: 0.33
Nodes (1): SessionLinkStore

### Community 102 - "Community 102"
Cohesion: 0.33
Nodes (1): HumanGuard

### Community 103 - "Community 103"
Cohesion: 0.33
Nodes (1): SessionInjector

### Community 104 - "Community 104"
Cohesion: 0.33
Nodes (1): ResponseObserver

### Community 105 - "Community 105"
Cohesion: 0.33
Nodes (1): SessionRegistry

### Community 106 - "Community 106"
Cohesion: 0.4
Nodes (0): 

### Community 107 - "Community 107"
Cohesion: 0.7
Nodes (4): connectWithBackwardsCompatibility(), listTools(), main(), startNotificationTool()

### Community 108 - "Community 108"
Cohesion: 0.4
Nodes (0): 

### Community 109 - "Community 109"
Cohesion: 0.5
Nodes (2): mapMiniTarget(), toJsonSchemaCompat()

### Community 110 - "Community 110"
Cohesion: 0.5
Nodes (2): AjvJsonSchemaValidator, createDefaultAjvInstance()

### Community 111 - "Community 111"
Cohesion: 0.4
Nodes (1): CfWorkerJsonSchemaValidator

### Community 112 - "Community 112"
Cohesion: 0.4
Nodes (4): BlockList, Server, Socket, SocketAddress

### Community 113 - "Community 113"
Cohesion: 0.4
Nodes (4): Module, Script, SourceTextModule, SyntheticModule

### Community 114 - "Community 114"
Cohesion: 0.4
Nodes (4): BroadcastChannel, MessageChannel, MessagePort, Worker

### Community 115 - "Community 115"
Cohesion: 0.4
Nodes (1): StringScriptSnapshot

### Community 116 - "Community 116"
Cohesion: 0.4
Nodes (0): 

### Community 117 - "Community 117"
Cohesion: 0.5
Nodes (2): getTestRunnerConstructor(), resolveTestRunner()

### Community 118 - "Community 118"
Cohesion: 0.4
Nodes (0): 

### Community 119 - "Community 119"
Cohesion: 0.4
Nodes (3): Bar, Subtest, Test

### Community 120 - "Community 120"
Cohesion: 0.4
Nodes (0): 

### Community 121 - "Community 121"
Cohesion: 0.4
Nodes (0): 

### Community 122 - "Community 122"
Cohesion: 0.4
Nodes (0): 

### Community 123 - "Community 123"
Cohesion: 0.5
Nodes (3): ClientCredentialsProvider, PrivateKeyJwtProvider, StaticPrivateKeyJwtProvider

### Community 124 - "Community 124"
Cohesion: 0.5
Nodes (3): SSEClientTransport, SseError, SSEServerTransport

### Community 125 - "Community 125"
Cohesion: 0.5
Nodes (3): ReadBuffer, StdioClientTransport, StdioServerTransport

### Community 126 - "Community 126"
Cohesion: 0.5
Nodes (3): StreamableHTTPClientTransport, StreamableHTTPError, StreamableHTTPServerTransport

### Community 127 - "Community 127"
Cohesion: 0.83
Nodes (3): listTools(), main(), startParallelNotificationTools()

### Community 128 - "Community 128"
Cohesion: 0.5
Nodes (1): ExperimentalMcpServerTasks

### Community 129 - "Community 129"
Cohesion: 0.83
Nodes (3): issueToolNameWarning(), validateAndWarnToolName(), validateToolName()

### Community 130 - "Community 130"
Cohesion: 0.83
Nodes (3): buildClientParams(), buildKeyMap(), stripEmptySlots()

### Community 131 - "Community 131"
Cohesion: 0.5
Nodes (3): Interface, Readline, Resolver

### Community 132 - "Community 132"
Cohesion: 0.5
Nodes (0): 

### Community 133 - "Community 133"
Cohesion: 0.5
Nodes (1): MockDate

### Community 134 - "Community 134"
Cohesion: 0.5
Nodes (0): 

### Community 135 - "Community 135"
Cohesion: 0.83
Nodes (3): closeInspector(), setupInspect(), shouldKeepOpen()

### Community 136 - "Community 136"
Cohesion: 0.5
Nodes (1): VitestNodeSnapshotEnvironment

### Community 137 - "Community 137"
Cohesion: 0.5
Nodes (0): 

### Community 138 - "Community 138"
Cohesion: 0.5
Nodes (0): 

### Community 139 - "Community 139"
Cohesion: 0.5
Nodes (0): 

### Community 140 - "Community 140"
Cohesion: 0.67
Nodes (2): buildDedupeKey(), createAndDispatchTask()

### Community 141 - "Community 141"
Cohesion: 0.83
Nodes (3): openBunDatabase(), openNodeDatabase(), openSqliteDatabase()

### Community 142 - "Community 142"
Cohesion: 0.5
Nodes (1): LoopGuard

### Community 143 - "Community 143"
Cohesion: 0.67
Nodes (0): 

### Community 144 - "Community 144"
Cohesion: 1.0
Nodes (2): createProvider(), main()

### Community 145 - "Community 145"
Cohesion: 0.67
Nodes (0): 

### Community 146 - "Community 146"
Cohesion: 0.67
Nodes (0): 

### Community 147 - "Community 147"
Cohesion: 0.67
Nodes (2): InMemoryTaskMessageQueue, InMemoryTaskStore

### Community 148 - "Community 148"
Cohesion: 0.67
Nodes (2): McpServer, ResourceTemplate

### Community 149 - "Community 149"
Cohesion: 1.0
Nodes (2): hostHeaderValidation(), localhostHostValidation()

### Community 150 - "Community 150"
Cohesion: 0.67
Nodes (0): 

### Community 151 - "Community 151"
Cohesion: 0.67
Nodes (0): 

### Community 152 - "Community 152"
Cohesion: 0.67
Nodes (0): 

### Community 153 - "Community 153"
Cohesion: 0.67
Nodes (0): 

### Community 154 - "Community 154"
Cohesion: 0.67
Nodes (2): AssertionError, CallTracker

### Community 155 - "Community 155"
Cohesion: 0.67
Nodes (2): AsyncLocalStorage, AsyncResource

### Community 156 - "Community 156"
Cohesion: 0.67
Nodes (2): Blob, File

### Community 157 - "Community 157"
Cohesion: 0.67
Nodes (2): Channel, TracingChannel

### Community 158 - "Community 158"
Cohesion: 0.67
Nodes (2): EventEmitter, EventEmitterAsyncResource

### Community 159 - "Community 159"
Cohesion: 0.67
Nodes (2): Http2ServerRequest, Http2ServerResponse

### Community 160 - "Community 160"
Cohesion: 0.67
Nodes (2): Agent, Server

### Community 161 - "Community 161"
Cohesion: 0.67
Nodes (2): Module, SourceMap

### Community 162 - "Community 162"
Cohesion: 0.67
Nodes (2): Recoverable, REPLServer

### Community 163 - "Community 163"
Cohesion: 0.67
Nodes (2): DatabaseSync, StatementSync

### Community 164 - "Community 164"
Cohesion: 0.67
Nodes (2): LcovReporter, SpecReporter

### Community 165 - "Community 165"
Cohesion: 0.67
Nodes (2): Server, TLSSocket

### Community 166 - "Community 166"
Cohesion: 0.67
Nodes (2): ReadStream, WriteStream

### Community 167 - "Community 167"
Cohesion: 0.67
Nodes (2): URL, URLSearchParams

### Community 168 - "Community 168"
Cohesion: 0.67
Nodes (0): 

### Community 169 - "Community 169"
Cohesion: 0.67
Nodes (0): 

### Community 170 - "Community 170"
Cohesion: 0.67
Nodes (2): SafeArray, VarDate

### Community 171 - "Community 171"
Cohesion: 0.67
Nodes (0): 

### Community 172 - "Community 172"
Cohesion: 0.67
Nodes (0): 

### Community 173 - "Community 173"
Cohesion: 0.67
Nodes (0): 

### Community 174 - "Community 174"
Cohesion: 0.67
Nodes (0): 

### Community 175 - "Community 175"
Cohesion: 0.67
Nodes (0): 

### Community 176 - "Community 176"
Cohesion: 0.67
Nodes (0): 

### Community 177 - "Community 177"
Cohesion: 0.67
Nodes (0): 

### Community 178 - "Community 178"
Cohesion: 0.67
Nodes (0): 

### Community 179 - "Community 179"
Cohesion: 0.67
Nodes (0): 

### Community 180 - "Community 180"
Cohesion: 0.67
Nodes (0): 

### Community 181 - "Community 181"
Cohesion: 0.67
Nodes (0): 

### Community 182 - "Community 182"
Cohesion: 1.0
Nodes (2): isRelayCurrentSessionPlaceholder(), shouldInjectRelaySessionID()

### Community 183 - "Community 183"
Cohesion: 0.67
Nodes (0): 

### Community 184 - "Community 184"
Cohesion: 0.67
Nodes (0): 

### Community 185 - "Community 185"
Cohesion: 0.67
Nodes (0): 

### Community 186 - "Community 186"
Cohesion: 0.67
Nodes (0): 

### Community 187 - "Community 187"
Cohesion: 0.67
Nodes (0): 

### Community 188 - "Community 188"
Cohesion: 1.0
Nodes (1): UnauthorizedError

### Community 189 - "Community 189"
Cohesion: 1.0
Nodes (1): WebSocketClientTransport

### Community 190 - "Community 190"
Cohesion: 1.0
Nodes (1): InMemoryOAuthClientProvider

### Community 191 - "Community 191"
Cohesion: 1.0
Nodes (0): 

### Community 192 - "Community 192"
Cohesion: 1.0
Nodes (0): 

### Community 193 - "Community 193"
Cohesion: 1.0
Nodes (0): 

### Community 194 - "Community 194"
Cohesion: 1.0
Nodes (0): 

### Community 195 - "Community 195"
Cohesion: 1.0
Nodes (0): 

### Community 196 - "Community 196"
Cohesion: 1.0
Nodes (0): 

### Community 197 - "Community 197"
Cohesion: 1.0
Nodes (0): 

### Community 198 - "Community 198"
Cohesion: 1.0
Nodes (0): 

### Community 199 - "Community 199"
Cohesion: 1.0
Nodes (0): 

### Community 200 - "Community 200"
Cohesion: 1.0
Nodes (0): 

### Community 201 - "Community 201"
Cohesion: 1.0
Nodes (0): 

### Community 202 - "Community 202"
Cohesion: 1.0
Nodes (1): InMemoryEventStore

### Community 203 - "Community 203"
Cohesion: 1.0
Nodes (1): ExperimentalClientTasks

### Community 204 - "Community 204"
Cohesion: 1.0
Nodes (0): 

### Community 205 - "Community 205"
Cohesion: 1.0
Nodes (1): ExperimentalMcpServerTasks

### Community 206 - "Community 206"
Cohesion: 1.0
Nodes (1): ExperimentalServerTasks

### Community 207 - "Community 207"
Cohesion: 1.0
Nodes (1): InMemoryTransport

### Community 208 - "Community 208"
Cohesion: 1.0
Nodes (0): 

### Community 209 - "Community 209"
Cohesion: 1.0
Nodes (0): 

### Community 210 - "Community 210"
Cohesion: 1.0
Nodes (0): 

### Community 211 - "Community 211"
Cohesion: 1.0
Nodes (1): WebStandardStreamableHTTPServerTransport

### Community 212 - "Community 212"
Cohesion: 1.0
Nodes (0): 

### Community 213 - "Community 213"
Cohesion: 1.0
Nodes (1): UriTemplate

### Community 214 - "Community 214"
Cohesion: 1.0
Nodes (1): AjvJsonSchemaValidator

### Community 215 - "Community 215"
Cohesion: 1.0
Nodes (1): CfWorkerJsonSchemaValidator

### Community 216 - "Community 216"
Cohesion: 1.0
Nodes (0): 

### Community 217 - "Community 217"
Cohesion: 1.0
Nodes (0): 

### Community 218 - "Community 218"
Cohesion: 1.0
Nodes (0): 

### Community 219 - "Community 219"
Cohesion: 1.0
Nodes (1): Interceptors

### Community 220 - "Community 220"
Cohesion: 1.0
Nodes (0): 

### Community 221 - "Community 221"
Cohesion: 1.0
Nodes (0): 

### Community 222 - "Community 222"
Cohesion: 1.0
Nodes (1): ChildProcess

### Community 223 - "Community 223"
Cohesion: 1.0
Nodes (1): Worker

### Community 224 - "Community 224"
Cohesion: 1.0
Nodes (1): Socket

### Community 225 - "Community 225"
Cohesion: 1.0
Nodes (1): Resolver

### Community 226 - "Community 226"
Cohesion: 1.0
Nodes (1): Domain

### Community 227 - "Community 227"
Cohesion: 1.0
Nodes (1): Session

### Community 228 - "Community 228"
Cohesion: 1.0
Nodes (1): Interface

### Community 229 - "Community 229"
Cohesion: 1.0
Nodes (1): StringDecoder

### Community 230 - "Community 230"
Cohesion: 1.0
Nodes (1): WASI

### Community 231 - "Community 231"
Cohesion: 1.0
Nodes (0): 

### Community 232 - "Community 232"
Cohesion: 1.0
Nodes (0): 

### Community 233 - "Community 233"
Cohesion: 1.0
Nodes (0): 

### Community 234 - "Community 234"
Cohesion: 1.0
Nodes (0): 

### Community 235 - "Community 235"
Cohesion: 1.0
Nodes (0): 

### Community 236 - "Community 236"
Cohesion: 1.0
Nodes (1): VitestNodeSnapshotEnvironment

### Community 237 - "Community 237"
Cohesion: 1.0
Nodes (0): 

### Community 238 - "Community 238"
Cohesion: 1.0
Nodes (0): 

### Community 239 - "Community 239"
Cohesion: 1.0
Nodes (0): 

### Community 240 - "Community 240"
Cohesion: 1.0
Nodes (0): 

### Community 241 - "Community 241"
Cohesion: 1.0
Nodes (0): 

### Community 242 - "Community 242"
Cohesion: 1.0
Nodes (0): 

### Community 243 - "Community 243"
Cohesion: 1.0
Nodes (0): 

### Community 244 - "Community 244"
Cohesion: 1.0
Nodes (0): 

### Community 245 - "Community 245"
Cohesion: 1.0
Nodes (0): 

### Community 246 - "Community 246"
Cohesion: 1.0
Nodes (0): 

### Community 247 - "Community 247"
Cohesion: 1.0
Nodes (0): 

### Community 248 - "Community 248"
Cohesion: 1.0
Nodes (0): 

### Community 249 - "Community 249"
Cohesion: 1.0
Nodes (0): 

### Community 250 - "Community 250"
Cohesion: 1.0
Nodes (0): 

### Community 251 - "Community 251"
Cohesion: 1.0
Nodes (0): 

### Community 252 - "Community 252"
Cohesion: 1.0
Nodes (0): 

### Community 253 - "Community 253"
Cohesion: 1.0
Nodes (0): 

### Community 254 - "Community 254"
Cohesion: 1.0
Nodes (0): 

### Community 255 - "Community 255"
Cohesion: 1.0
Nodes (0): 

### Community 256 - "Community 256"
Cohesion: 1.0
Nodes (0): 

### Community 257 - "Community 257"
Cohesion: 1.0
Nodes (0): 

### Community 258 - "Community 258"
Cohesion: 1.0
Nodes (0): 

### Community 259 - "Community 259"
Cohesion: 1.0
Nodes (0): 

### Community 260 - "Community 260"
Cohesion: 1.0
Nodes (0): 

### Community 261 - "Community 261"
Cohesion: 1.0
Nodes (0): 

### Community 262 - "Community 262"
Cohesion: 1.0
Nodes (0): 

### Community 263 - "Community 263"
Cohesion: 1.0
Nodes (0): 

### Community 264 - "Community 264"
Cohesion: 1.0
Nodes (0): 

### Community 265 - "Community 265"
Cohesion: 1.0
Nodes (0): 

### Community 266 - "Community 266"
Cohesion: 1.0
Nodes (0): 

### Community 267 - "Community 267"
Cohesion: 1.0
Nodes (0): 

### Community 268 - "Community 268"
Cohesion: 1.0
Nodes (0): 

### Community 269 - "Community 269"
Cohesion: 1.0
Nodes (0): 

### Community 270 - "Community 270"
Cohesion: 1.0
Nodes (0): 

### Community 271 - "Community 271"
Cohesion: 1.0
Nodes (0): 

### Community 272 - "Community 272"
Cohesion: 1.0
Nodes (0): 

### Community 273 - "Community 273"
Cohesion: 1.0
Nodes (0): 

### Community 274 - "Community 274"
Cohesion: 1.0
Nodes (0): 

### Community 275 - "Community 275"
Cohesion: 1.0
Nodes (0): 

### Community 276 - "Community 276"
Cohesion: 1.0
Nodes (0): 

### Community 277 - "Community 277"
Cohesion: 1.0
Nodes (0): 

### Community 278 - "Community 278"
Cohesion: 1.0
Nodes (0): 

### Community 279 - "Community 279"
Cohesion: 1.0
Nodes (0): 

### Community 280 - "Community 280"
Cohesion: 1.0
Nodes (0): 

### Community 281 - "Community 281"
Cohesion: 1.0
Nodes (0): 

### Community 282 - "Community 282"
Cohesion: 1.0
Nodes (0): 

### Community 283 - "Community 283"
Cohesion: 1.0
Nodes (0): 

### Community 284 - "Community 284"
Cohesion: 1.0
Nodes (0): 

### Community 285 - "Community 285"
Cohesion: 1.0
Nodes (0): 

### Community 286 - "Community 286"
Cohesion: 1.0
Nodes (0): 

### Community 287 - "Community 287"
Cohesion: 1.0
Nodes (0): 

### Community 288 - "Community 288"
Cohesion: 1.0
Nodes (1): ParseStatus

### Community 289 - "Community 289"
Cohesion: 1.0
Nodes (1): ZodError

### Community 290 - "Community 290"
Cohesion: 1.0
Nodes (1): $ZodAsyncError

### Community 291 - "Community 291"
Cohesion: 1.0
Nodes (1): Doc

### Community 292 - "Community 292"
Cohesion: 1.0
Nodes (1): $ZodFunction

### Community 293 - "Community 293"
Cohesion: 1.0
Nodes (1): $ZodRegistry

### Community 294 - "Community 294"
Cohesion: 1.0
Nodes (1): JSONSchemaGenerator

### Community 295 - "Community 295"
Cohesion: 1.0
Nodes (0): 

### Community 296 - "Community 296"
Cohesion: 1.0
Nodes (0): 

### Community 297 - "Community 297"
Cohesion: 1.0
Nodes (0): 

### Community 298 - "Community 298"
Cohesion: 1.0
Nodes (1): A2ARelayHost

### Community 299 - "Community 299"
Cohesion: 1.0
Nodes (0): 

### Community 300 - "Community 300"
Cohesion: 1.0
Nodes (1): TaskEventHub

### Community 301 - "Community 301"
Cohesion: 1.0
Nodes (0): 

### Community 302 - "Community 302"
Cohesion: 1.0
Nodes (0): 

### Community 303 - "Community 303"
Cohesion: 1.0
Nodes (0): 

### Community 304 - "Community 304"
Cohesion: 1.0
Nodes (1): RelayRoomOrchestrator

### Community 305 - "Community 305"
Cohesion: 1.0
Nodes (1): AuditStore

### Community 306 - "Community 306"
Cohesion: 1.0
Nodes (1): MessageStore

### Community 307 - "Community 307"
Cohesion: 1.0
Nodes (1): RoomStore

### Community 308 - "Community 308"
Cohesion: 1.0
Nodes (0): 

### Community 309 - "Community 309"
Cohesion: 1.0
Nodes (1): SessionLinkStore

### Community 310 - "Community 310"
Cohesion: 1.0
Nodes (1): TaskStore

### Community 311 - "Community 311"
Cohesion: 1.0
Nodes (1): TeamStore

### Community 312 - "Community 312"
Cohesion: 1.0
Nodes (1): ThreadStore

### Community 313 - "Community 313"
Cohesion: 1.0
Nodes (0): 

### Community 314 - "Community 314"
Cohesion: 1.0
Nodes (0): 

### Community 315 - "Community 315"
Cohesion: 1.0
Nodes (0): 

### Community 316 - "Community 316"
Cohesion: 1.0
Nodes (1): HumanGuard

### Community 317 - "Community 317"
Cohesion: 1.0
Nodes (1): SessionInjector

### Community 318 - "Community 318"
Cohesion: 1.0
Nodes (1): LoopGuard

### Community 319 - "Community 319"
Cohesion: 1.0
Nodes (0): 

### Community 320 - "Community 320"
Cohesion: 1.0
Nodes (1): RelayRuntime

### Community 321 - "Community 321"
Cohesion: 1.0
Nodes (1): ResponseObserver

### Community 322 - "Community 322"
Cohesion: 1.0
Nodes (1): SessionRegistry

### Community 323 - "Community 323"
Cohesion: 1.0
Nodes (0): 

### Community 324 - "Community 324"
Cohesion: 1.0
Nodes (0): 

### Community 325 - "Community 325"
Cohesion: 1.0
Nodes (0): 

### Community 326 - "Community 326"
Cohesion: 1.0
Nodes (0): 

### Community 327 - "Community 327"
Cohesion: 1.0
Nodes (0): 

### Community 328 - "Community 328"
Cohesion: 1.0
Nodes (0): 

### Community 329 - "Community 329"
Cohesion: 1.0
Nodes (0): 

### Community 330 - "Community 330"
Cohesion: 1.0
Nodes (0): 

### Community 331 - "Community 331"
Cohesion: 1.0
Nodes (0): 

### Community 332 - "Community 332"
Cohesion: 1.0
Nodes (0): 

### Community 333 - "Community 333"
Cohesion: 1.0
Nodes (0): 

### Community 334 - "Community 334"
Cohesion: 1.0
Nodes (0): 

### Community 335 - "Community 335"
Cohesion: 1.0
Nodes (0): 

### Community 336 - "Community 336"
Cohesion: 1.0
Nodes (0): 

### Community 337 - "Community 337"
Cohesion: 1.0
Nodes (0): 

### Community 338 - "Community 338"
Cohesion: 1.0
Nodes (0): 

### Community 339 - "Community 339"
Cohesion: 1.0
Nodes (0): 

### Community 340 - "Community 340"
Cohesion: 1.0
Nodes (0): 

### Community 341 - "Community 341"
Cohesion: 1.0
Nodes (0): 

### Community 342 - "Community 342"
Cohesion: 1.0
Nodes (0): 

### Community 343 - "Community 343"
Cohesion: 1.0
Nodes (0): 

### Community 344 - "Community 344"
Cohesion: 1.0
Nodes (0): 

### Community 345 - "Community 345"
Cohesion: 1.0
Nodes (0): 

### Community 346 - "Community 346"
Cohesion: 1.0
Nodes (0): 

### Community 347 - "Community 347"
Cohesion: 1.0
Nodes (0): 

### Community 348 - "Community 348"
Cohesion: 1.0
Nodes (0): 

### Community 349 - "Community 349"
Cohesion: 1.0
Nodes (0): 

### Community 350 - "Community 350"
Cohesion: 1.0
Nodes (0): 

### Community 351 - "Community 351"
Cohesion: 1.0
Nodes (0): 

### Community 352 - "Community 352"
Cohesion: 1.0
Nodes (0): 

### Community 353 - "Community 353"
Cohesion: 1.0
Nodes (0): 

### Community 354 - "Community 354"
Cohesion: 1.0
Nodes (0): 

### Community 355 - "Community 355"
Cohesion: 1.0
Nodes (0): 

### Community 356 - "Community 356"
Cohesion: 1.0
Nodes (0): 

### Community 357 - "Community 357"
Cohesion: 1.0
Nodes (0): 

### Community 358 - "Community 358"
Cohesion: 1.0
Nodes (0): 

### Community 359 - "Community 359"
Cohesion: 1.0
Nodes (0): 

### Community 360 - "Community 360"
Cohesion: 1.0
Nodes (0): 

### Community 361 - "Community 361"
Cohesion: 1.0
Nodes (0): 

### Community 362 - "Community 362"
Cohesion: 1.0
Nodes (0): 

### Community 363 - "Community 363"
Cohesion: 1.0
Nodes (0): 

### Community 364 - "Community 364"
Cohesion: 1.0
Nodes (0): 

### Community 365 - "Community 365"
Cohesion: 1.0
Nodes (0): 

### Community 366 - "Community 366"
Cohesion: 1.0
Nodes (0): 

### Community 367 - "Community 367"
Cohesion: 1.0
Nodes (0): 

### Community 368 - "Community 368"
Cohesion: 1.0
Nodes (0): 

### Community 369 - "Community 369"
Cohesion: 1.0
Nodes (0): 

### Community 370 - "Community 370"
Cohesion: 1.0
Nodes (0): 

### Community 371 - "Community 371"
Cohesion: 1.0
Nodes (0): 

### Community 372 - "Community 372"
Cohesion: 1.0
Nodes (0): 

### Community 373 - "Community 373"
Cohesion: 1.0
Nodes (0): 

### Community 374 - "Community 374"
Cohesion: 1.0
Nodes (0): 

### Community 375 - "Community 375"
Cohesion: 1.0
Nodes (0): 

### Community 376 - "Community 376"
Cohesion: 1.0
Nodes (0): 

### Community 377 - "Community 377"
Cohesion: 1.0
Nodes (0): 

### Community 378 - "Community 378"
Cohesion: 1.0
Nodes (0): 

### Community 379 - "Community 379"
Cohesion: 1.0
Nodes (0): 

### Community 380 - "Community 380"
Cohesion: 1.0
Nodes (0): 

### Community 381 - "Community 381"
Cohesion: 1.0
Nodes (0): 

### Community 382 - "Community 382"
Cohesion: 1.0
Nodes (0): 

### Community 383 - "Community 383"
Cohesion: 1.0
Nodes (0): 

### Community 384 - "Community 384"
Cohesion: 1.0
Nodes (0): 

### Community 385 - "Community 385"
Cohesion: 1.0
Nodes (0): 

### Community 386 - "Community 386"
Cohesion: 1.0
Nodes (0): 

### Community 387 - "Community 387"
Cohesion: 1.0
Nodes (0): 

### Community 388 - "Community 388"
Cohesion: 1.0
Nodes (0): 

### Community 389 - "Community 389"
Cohesion: 1.0
Nodes (0): 

### Community 390 - "Community 390"
Cohesion: 1.0
Nodes (0): 

### Community 391 - "Community 391"
Cohesion: 1.0
Nodes (0): 

### Community 392 - "Community 392"
Cohesion: 1.0
Nodes (0): 

### Community 393 - "Community 393"
Cohesion: 1.0
Nodes (0): 

### Community 394 - "Community 394"
Cohesion: 1.0
Nodes (0): 

### Community 395 - "Community 395"
Cohesion: 1.0
Nodes (0): 

### Community 396 - "Community 396"
Cohesion: 1.0
Nodes (0): 

### Community 397 - "Community 397"
Cohesion: 1.0
Nodes (0): 

### Community 398 - "Community 398"
Cohesion: 1.0
Nodes (0): 

### Community 399 - "Community 399"
Cohesion: 1.0
Nodes (0): 

### Community 400 - "Community 400"
Cohesion: 1.0
Nodes (0): 

### Community 401 - "Community 401"
Cohesion: 1.0
Nodes (0): 

### Community 402 - "Community 402"
Cohesion: 1.0
Nodes (0): 

### Community 403 - "Community 403"
Cohesion: 1.0
Nodes (0): 

### Community 404 - "Community 404"
Cohesion: 1.0
Nodes (0): 

### Community 405 - "Community 405"
Cohesion: 1.0
Nodes (0): 

### Community 406 - "Community 406"
Cohesion: 1.0
Nodes (0): 

### Community 407 - "Community 407"
Cohesion: 1.0
Nodes (0): 

### Community 408 - "Community 408"
Cohesion: 1.0
Nodes (0): 

### Community 409 - "Community 409"
Cohesion: 1.0
Nodes (0): 

### Community 410 - "Community 410"
Cohesion: 1.0
Nodes (0): 

### Community 411 - "Community 411"
Cohesion: 1.0
Nodes (0): 

### Community 412 - "Community 412"
Cohesion: 1.0
Nodes (0): 

### Community 413 - "Community 413"
Cohesion: 1.0
Nodes (0): 

### Community 414 - "Community 414"
Cohesion: 1.0
Nodes (0): 

### Community 415 - "Community 415"
Cohesion: 1.0
Nodes (0): 

### Community 416 - "Community 416"
Cohesion: 1.0
Nodes (0): 

### Community 417 - "Community 417"
Cohesion: 1.0
Nodes (0): 

### Community 418 - "Community 418"
Cohesion: 1.0
Nodes (0): 

### Community 419 - "Community 419"
Cohesion: 1.0
Nodes (0): 

### Community 420 - "Community 420"
Cohesion: 1.0
Nodes (0): 

### Community 421 - "Community 421"
Cohesion: 1.0
Nodes (0): 

### Community 422 - "Community 422"
Cohesion: 1.0
Nodes (0): 

### Community 423 - "Community 423"
Cohesion: 1.0
Nodes (0): 

### Community 424 - "Community 424"
Cohesion: 1.0
Nodes (0): 

### Community 425 - "Community 425"
Cohesion: 1.0
Nodes (0): 

### Community 426 - "Community 426"
Cohesion: 1.0
Nodes (0): 

### Community 427 - "Community 427"
Cohesion: 1.0
Nodes (0): 

### Community 428 - "Community 428"
Cohesion: 1.0
Nodes (0): 

### Community 429 - "Community 429"
Cohesion: 1.0
Nodes (0): 

### Community 430 - "Community 430"
Cohesion: 1.0
Nodes (0): 

### Community 431 - "Community 431"
Cohesion: 1.0
Nodes (0): 

### Community 432 - "Community 432"
Cohesion: 1.0
Nodes (0): 

### Community 433 - "Community 433"
Cohesion: 1.0
Nodes (0): 

### Community 434 - "Community 434"
Cohesion: 1.0
Nodes (0): 

### Community 435 - "Community 435"
Cohesion: 1.0
Nodes (0): 

### Community 436 - "Community 436"
Cohesion: 1.0
Nodes (0): 

### Community 437 - "Community 437"
Cohesion: 1.0
Nodes (0): 

### Community 438 - "Community 438"
Cohesion: 1.0
Nodes (0): 

### Community 439 - "Community 439"
Cohesion: 1.0
Nodes (0): 

### Community 440 - "Community 440"
Cohesion: 1.0
Nodes (0): 

### Community 441 - "Community 441"
Cohesion: 1.0
Nodes (0): 

### Community 442 - "Community 442"
Cohesion: 1.0
Nodes (0): 

### Community 443 - "Community 443"
Cohesion: 1.0
Nodes (0): 

### Community 444 - "Community 444"
Cohesion: 1.0
Nodes (0): 

### Community 445 - "Community 445"
Cohesion: 1.0
Nodes (0): 

### Community 446 - "Community 446"
Cohesion: 1.0
Nodes (0): 

### Community 447 - "Community 447"
Cohesion: 1.0
Nodes (0): 

### Community 448 - "Community 448"
Cohesion: 1.0
Nodes (0): 

### Community 449 - "Community 449"
Cohesion: 1.0
Nodes (0): 

### Community 450 - "Community 450"
Cohesion: 1.0
Nodes (0): 

### Community 451 - "Community 451"
Cohesion: 1.0
Nodes (0): 

### Community 452 - "Community 452"
Cohesion: 1.0
Nodes (0): 

### Community 453 - "Community 453"
Cohesion: 1.0
Nodes (0): 

### Community 454 - "Community 454"
Cohesion: 1.0
Nodes (0): 

### Community 455 - "Community 455"
Cohesion: 1.0
Nodes (0): 

### Community 456 - "Community 456"
Cohesion: 1.0
Nodes (0): 

### Community 457 - "Community 457"
Cohesion: 1.0
Nodes (0): 

### Community 458 - "Community 458"
Cohesion: 1.0
Nodes (0): 

### Community 459 - "Community 459"
Cohesion: 1.0
Nodes (0): 

### Community 460 - "Community 460"
Cohesion: 1.0
Nodes (0): 

### Community 461 - "Community 461"
Cohesion: 1.0
Nodes (0): 

### Community 462 - "Community 462"
Cohesion: 1.0
Nodes (0): 

### Community 463 - "Community 463"
Cohesion: 1.0
Nodes (0): 

### Community 464 - "Community 464"
Cohesion: 1.0
Nodes (0): 

### Community 465 - "Community 465"
Cohesion: 1.0
Nodes (0): 

### Community 466 - "Community 466"
Cohesion: 1.0
Nodes (0): 

### Community 467 - "Community 467"
Cohesion: 1.0
Nodes (0): 

### Community 468 - "Community 468"
Cohesion: 1.0
Nodes (0): 

### Community 469 - "Community 469"
Cohesion: 1.0
Nodes (0): 

### Community 470 - "Community 470"
Cohesion: 1.0
Nodes (0): 

### Community 471 - "Community 471"
Cohesion: 1.0
Nodes (0): 

### Community 472 - "Community 472"
Cohesion: 1.0
Nodes (0): 

### Community 473 - "Community 473"
Cohesion: 1.0
Nodes (0): 

### Community 474 - "Community 474"
Cohesion: 1.0
Nodes (0): 

### Community 475 - "Community 475"
Cohesion: 1.0
Nodes (0): 

### Community 476 - "Community 476"
Cohesion: 1.0
Nodes (0): 

### Community 477 - "Community 477"
Cohesion: 1.0
Nodes (0): 

### Community 478 - "Community 478"
Cohesion: 1.0
Nodes (0): 

### Community 479 - "Community 479"
Cohesion: 1.0
Nodes (0): 

### Community 480 - "Community 480"
Cohesion: 1.0
Nodes (0): 

### Community 481 - "Community 481"
Cohesion: 1.0
Nodes (0): 

### Community 482 - "Community 482"
Cohesion: 1.0
Nodes (0): 

### Community 483 - "Community 483"
Cohesion: 1.0
Nodes (0): 

### Community 484 - "Community 484"
Cohesion: 1.0
Nodes (0): 

### Community 485 - "Community 485"
Cohesion: 1.0
Nodes (0): 

### Community 486 - "Community 486"
Cohesion: 1.0
Nodes (0): 

### Community 487 - "Community 487"
Cohesion: 1.0
Nodes (0): 

### Community 488 - "Community 488"
Cohesion: 1.0
Nodes (0): 

### Community 489 - "Community 489"
Cohesion: 1.0
Nodes (0): 

### Community 490 - "Community 490"
Cohesion: 1.0
Nodes (0): 

### Community 491 - "Community 491"
Cohesion: 1.0
Nodes (0): 

### Community 492 - "Community 492"
Cohesion: 1.0
Nodes (0): 

### Community 493 - "Community 493"
Cohesion: 1.0
Nodes (0): 

### Community 494 - "Community 494"
Cohesion: 1.0
Nodes (0): 

### Community 495 - "Community 495"
Cohesion: 1.0
Nodes (0): 

### Community 496 - "Community 496"
Cohesion: 1.0
Nodes (0): 

### Community 497 - "Community 497"
Cohesion: 1.0
Nodes (0): 

### Community 498 - "Community 498"
Cohesion: 1.0
Nodes (0): 

### Community 499 - "Community 499"
Cohesion: 1.0
Nodes (0): 

### Community 500 - "Community 500"
Cohesion: 1.0
Nodes (0): 

### Community 501 - "Community 501"
Cohesion: 1.0
Nodes (0): 

### Community 502 - "Community 502"
Cohesion: 1.0
Nodes (0): 

### Community 503 - "Community 503"
Cohesion: 1.0
Nodes (0): 

### Community 504 - "Community 504"
Cohesion: 1.0
Nodes (0): 

### Community 505 - "Community 505"
Cohesion: 1.0
Nodes (0): 

### Community 506 - "Community 506"
Cohesion: 1.0
Nodes (0): 

### Community 507 - "Community 507"
Cohesion: 1.0
Nodes (0): 

### Community 508 - "Community 508"
Cohesion: 1.0
Nodes (0): 

### Community 509 - "Community 509"
Cohesion: 1.0
Nodes (0): 

### Community 510 - "Community 510"
Cohesion: 1.0
Nodes (0): 

### Community 511 - "Community 511"
Cohesion: 1.0
Nodes (0): 

### Community 512 - "Community 512"
Cohesion: 1.0
Nodes (0): 

### Community 513 - "Community 513"
Cohesion: 1.0
Nodes (0): 

### Community 514 - "Community 514"
Cohesion: 1.0
Nodes (0): 

### Community 515 - "Community 515"
Cohesion: 1.0
Nodes (0): 

### Community 516 - "Community 516"
Cohesion: 1.0
Nodes (0): 

### Community 517 - "Community 517"
Cohesion: 1.0
Nodes (0): 

### Community 518 - "Community 518"
Cohesion: 1.0
Nodes (0): 

### Community 519 - "Community 519"
Cohesion: 1.0
Nodes (0): 

### Community 520 - "Community 520"
Cohesion: 1.0
Nodes (0): 

### Community 521 - "Community 521"
Cohesion: 1.0
Nodes (0): 

### Community 522 - "Community 522"
Cohesion: 1.0
Nodes (0): 

### Community 523 - "Community 523"
Cohesion: 1.0
Nodes (0): 

### Community 524 - "Community 524"
Cohesion: 1.0
Nodes (0): 

### Community 525 - "Community 525"
Cohesion: 1.0
Nodes (0): 

### Community 526 - "Community 526"
Cohesion: 1.0
Nodes (0): 

### Community 527 - "Community 527"
Cohesion: 1.0
Nodes (0): 

### Community 528 - "Community 528"
Cohesion: 1.0
Nodes (0): 

### Community 529 - "Community 529"
Cohesion: 1.0
Nodes (0): 

### Community 530 - "Community 530"
Cohesion: 1.0
Nodes (0): 

### Community 531 - "Community 531"
Cohesion: 1.0
Nodes (0): 

### Community 532 - "Community 532"
Cohesion: 1.0
Nodes (0): 

### Community 533 - "Community 533"
Cohesion: 1.0
Nodes (0): 

### Community 534 - "Community 534"
Cohesion: 1.0
Nodes (0): 

### Community 535 - "Community 535"
Cohesion: 1.0
Nodes (0): 

### Community 536 - "Community 536"
Cohesion: 1.0
Nodes (0): 

### Community 537 - "Community 537"
Cohesion: 1.0
Nodes (0): 

### Community 538 - "Community 538"
Cohesion: 1.0
Nodes (0): 

### Community 539 - "Community 539"
Cohesion: 1.0
Nodes (0): 

### Community 540 - "Community 540"
Cohesion: 1.0
Nodes (0): 

### Community 541 - "Community 541"
Cohesion: 1.0
Nodes (0): 

### Community 542 - "Community 542"
Cohesion: 1.0
Nodes (0): 

### Community 543 - "Community 543"
Cohesion: 1.0
Nodes (0): 

### Community 544 - "Community 544"
Cohesion: 1.0
Nodes (0): 

### Community 545 - "Community 545"
Cohesion: 1.0
Nodes (0): 

### Community 546 - "Community 546"
Cohesion: 1.0
Nodes (0): 

### Community 547 - "Community 547"
Cohesion: 1.0
Nodes (0): 

### Community 548 - "Community 548"
Cohesion: 1.0
Nodes (0): 

### Community 549 - "Community 549"
Cohesion: 1.0
Nodes (0): 

### Community 550 - "Community 550"
Cohesion: 1.0
Nodes (0): 

### Community 551 - "Community 551"
Cohesion: 1.0
Nodes (0): 

### Community 552 - "Community 552"
Cohesion: 1.0
Nodes (0): 

### Community 553 - "Community 553"
Cohesion: 1.0
Nodes (0): 

### Community 554 - "Community 554"
Cohesion: 1.0
Nodes (0): 

### Community 555 - "Community 555"
Cohesion: 1.0
Nodes (0): 

### Community 556 - "Community 556"
Cohesion: 1.0
Nodes (0): 

### Community 557 - "Community 557"
Cohesion: 1.0
Nodes (0): 

### Community 558 - "Community 558"
Cohesion: 1.0
Nodes (0): 

### Community 559 - "Community 559"
Cohesion: 1.0
Nodes (0): 

### Community 560 - "Community 560"
Cohesion: 1.0
Nodes (0): 

### Community 561 - "Community 561"
Cohesion: 1.0
Nodes (0): 

### Community 562 - "Community 562"
Cohesion: 1.0
Nodes (0): 

### Community 563 - "Community 563"
Cohesion: 1.0
Nodes (0): 

### Community 564 - "Community 564"
Cohesion: 1.0
Nodes (0): 

### Community 565 - "Community 565"
Cohesion: 1.0
Nodes (0): 

### Community 566 - "Community 566"
Cohesion: 1.0
Nodes (0): 

### Community 567 - "Community 567"
Cohesion: 1.0
Nodes (0): 

### Community 568 - "Community 568"
Cohesion: 1.0
Nodes (0): 

### Community 569 - "Community 569"
Cohesion: 1.0
Nodes (0): 

### Community 570 - "Community 570"
Cohesion: 1.0
Nodes (0): 

### Community 571 - "Community 571"
Cohesion: 1.0
Nodes (0): 

### Community 572 - "Community 572"
Cohesion: 1.0
Nodes (0): 

### Community 573 - "Community 573"
Cohesion: 1.0
Nodes (0): 

### Community 574 - "Community 574"
Cohesion: 1.0
Nodes (0): 

### Community 575 - "Community 575"
Cohesion: 1.0
Nodes (0): 

### Community 576 - "Community 576"
Cohesion: 1.0
Nodes (0): 

### Community 577 - "Community 577"
Cohesion: 1.0
Nodes (0): 

### Community 578 - "Community 578"
Cohesion: 1.0
Nodes (0): 

### Community 579 - "Community 579"
Cohesion: 1.0
Nodes (0): 

### Community 580 - "Community 580"
Cohesion: 1.0
Nodes (0): 

### Community 581 - "Community 581"
Cohesion: 1.0
Nodes (0): 

### Community 582 - "Community 582"
Cohesion: 1.0
Nodes (0): 

### Community 583 - "Community 583"
Cohesion: 1.0
Nodes (0): 

### Community 584 - "Community 584"
Cohesion: 1.0
Nodes (0): 

### Community 585 - "Community 585"
Cohesion: 1.0
Nodes (0): 

### Community 586 - "Community 586"
Cohesion: 1.0
Nodes (0): 

### Community 587 - "Community 587"
Cohesion: 1.0
Nodes (0): 

### Community 588 - "Community 588"
Cohesion: 1.0
Nodes (0): 

### Community 589 - "Community 589"
Cohesion: 1.0
Nodes (0): 

### Community 590 - "Community 590"
Cohesion: 1.0
Nodes (0): 

### Community 591 - "Community 591"
Cohesion: 1.0
Nodes (0): 

### Community 592 - "Community 592"
Cohesion: 1.0
Nodes (0): 

### Community 593 - "Community 593"
Cohesion: 1.0
Nodes (0): 

### Community 594 - "Community 594"
Cohesion: 1.0
Nodes (0): 

### Community 595 - "Community 595"
Cohesion: 1.0
Nodes (0): 

### Community 596 - "Community 596"
Cohesion: 1.0
Nodes (0): 

### Community 597 - "Community 597"
Cohesion: 1.0
Nodes (0): 

### Community 598 - "Community 598"
Cohesion: 1.0
Nodes (0): 

### Community 599 - "Community 599"
Cohesion: 1.0
Nodes (0): 

### Community 600 - "Community 600"
Cohesion: 1.0
Nodes (0): 

### Community 601 - "Community 601"
Cohesion: 1.0
Nodes (0): 

### Community 602 - "Community 602"
Cohesion: 1.0
Nodes (0): 

### Community 603 - "Community 603"
Cohesion: 1.0
Nodes (0): 

### Community 604 - "Community 604"
Cohesion: 1.0
Nodes (0): 

### Community 605 - "Community 605"
Cohesion: 1.0
Nodes (0): 

### Community 606 - "Community 606"
Cohesion: 1.0
Nodes (0): 

### Community 607 - "Community 607"
Cohesion: 1.0
Nodes (0): 

### Community 608 - "Community 608"
Cohesion: 1.0
Nodes (0): 

### Community 609 - "Community 609"
Cohesion: 1.0
Nodes (0): 

### Community 610 - "Community 610"
Cohesion: 1.0
Nodes (0): 

### Community 611 - "Community 611"
Cohesion: 1.0
Nodes (0): 

### Community 612 - "Community 612"
Cohesion: 1.0
Nodes (0): 

### Community 613 - "Community 613"
Cohesion: 1.0
Nodes (0): 

### Community 614 - "Community 614"
Cohesion: 1.0
Nodes (0): 

### Community 615 - "Community 615"
Cohesion: 1.0
Nodes (0): 

### Community 616 - "Community 616"
Cohesion: 1.0
Nodes (0): 

### Community 617 - "Community 617"
Cohesion: 1.0
Nodes (0): 

### Community 618 - "Community 618"
Cohesion: 1.0
Nodes (0): 

### Community 619 - "Community 619"
Cohesion: 1.0
Nodes (0): 

### Community 620 - "Community 620"
Cohesion: 1.0
Nodes (0): 

### Community 621 - "Community 621"
Cohesion: 1.0
Nodes (0): 

### Community 622 - "Community 622"
Cohesion: 1.0
Nodes (0): 

### Community 623 - "Community 623"
Cohesion: 1.0
Nodes (0): 

### Community 624 - "Community 624"
Cohesion: 1.0
Nodes (0): 

### Community 625 - "Community 625"
Cohesion: 1.0
Nodes (0): 

### Community 626 - "Community 626"
Cohesion: 1.0
Nodes (0): 

### Community 627 - "Community 627"
Cohesion: 1.0
Nodes (0): 

### Community 628 - "Community 628"
Cohesion: 1.0
Nodes (0): 

### Community 629 - "Community 629"
Cohesion: 1.0
Nodes (0): 

### Community 630 - "Community 630"
Cohesion: 1.0
Nodes (0): 

### Community 631 - "Community 631"
Cohesion: 1.0
Nodes (0): 

### Community 632 - "Community 632"
Cohesion: 1.0
Nodes (0): 

### Community 633 - "Community 633"
Cohesion: 1.0
Nodes (0): 

### Community 634 - "Community 634"
Cohesion: 1.0
Nodes (0): 

### Community 635 - "Community 635"
Cohesion: 1.0
Nodes (0): 

### Community 636 - "Community 636"
Cohesion: 1.0
Nodes (0): 

### Community 637 - "Community 637"
Cohesion: 1.0
Nodes (0): 

### Community 638 - "Community 638"
Cohesion: 1.0
Nodes (0): 

### Community 639 - "Community 639"
Cohesion: 1.0
Nodes (0): 

### Community 640 - "Community 640"
Cohesion: 1.0
Nodes (0): 

### Community 641 - "Community 641"
Cohesion: 1.0
Nodes (0): 

### Community 642 - "Community 642"
Cohesion: 1.0
Nodes (0): 

### Community 643 - "Community 643"
Cohesion: 1.0
Nodes (0): 

### Community 644 - "Community 644"
Cohesion: 1.0
Nodes (0): 

### Community 645 - "Community 645"
Cohesion: 1.0
Nodes (0): 

### Community 646 - "Community 646"
Cohesion: 1.0
Nodes (0): 

### Community 647 - "Community 647"
Cohesion: 1.0
Nodes (0): 

### Community 648 - "Community 648"
Cohesion: 1.0
Nodes (0): 

### Community 649 - "Community 649"
Cohesion: 1.0
Nodes (0): 

### Community 650 - "Community 650"
Cohesion: 1.0
Nodes (0): 

### Community 651 - "Community 651"
Cohesion: 1.0
Nodes (0): 

### Community 652 - "Community 652"
Cohesion: 1.0
Nodes (0): 

### Community 653 - "Community 653"
Cohesion: 1.0
Nodes (0): 

### Community 654 - "Community 654"
Cohesion: 1.0
Nodes (0): 

### Community 655 - "Community 655"
Cohesion: 1.0
Nodes (0): 

### Community 656 - "Community 656"
Cohesion: 1.0
Nodes (0): 

### Community 657 - "Community 657"
Cohesion: 1.0
Nodes (0): 

### Community 658 - "Community 658"
Cohesion: 1.0
Nodes (0): 

### Community 659 - "Community 659"
Cohesion: 1.0
Nodes (0): 

### Community 660 - "Community 660"
Cohesion: 1.0
Nodes (0): 

### Community 661 - "Community 661"
Cohesion: 1.0
Nodes (0): 

### Community 662 - "Community 662"
Cohesion: 1.0
Nodes (0): 

### Community 663 - "Community 663"
Cohesion: 1.0
Nodes (0): 

### Community 664 - "Community 664"
Cohesion: 1.0
Nodes (0): 

### Community 665 - "Community 665"
Cohesion: 1.0
Nodes (0): 

### Community 666 - "Community 666"
Cohesion: 1.0
Nodes (0): 

### Community 667 - "Community 667"
Cohesion: 1.0
Nodes (0): 

### Community 668 - "Community 668"
Cohesion: 1.0
Nodes (0): 

### Community 669 - "Community 669"
Cohesion: 1.0
Nodes (0): 

### Community 670 - "Community 670"
Cohesion: 1.0
Nodes (0): 

### Community 671 - "Community 671"
Cohesion: 1.0
Nodes (0): 

### Community 672 - "Community 672"
Cohesion: 1.0
Nodes (0): 

### Community 673 - "Community 673"
Cohesion: 1.0
Nodes (0): 

### Community 674 - "Community 674"
Cohesion: 1.0
Nodes (0): 

### Community 675 - "Community 675"
Cohesion: 1.0
Nodes (0): 

### Community 676 - "Community 676"
Cohesion: 1.0
Nodes (0): 

### Community 677 - "Community 677"
Cohesion: 1.0
Nodes (0): 

### Community 678 - "Community 678"
Cohesion: 1.0
Nodes (0): 

### Community 679 - "Community 679"
Cohesion: 1.0
Nodes (0): 

### Community 680 - "Community 680"
Cohesion: 1.0
Nodes (0): 

### Community 681 - "Community 681"
Cohesion: 1.0
Nodes (0): 

### Community 682 - "Community 682"
Cohesion: 1.0
Nodes (0): 

### Community 683 - "Community 683"
Cohesion: 1.0
Nodes (0): 

### Community 684 - "Community 684"
Cohesion: 1.0
Nodes (0): 

### Community 685 - "Community 685"
Cohesion: 1.0
Nodes (0): 

### Community 686 - "Community 686"
Cohesion: 1.0
Nodes (0): 

### Community 687 - "Community 687"
Cohesion: 1.0
Nodes (0): 

### Community 688 - "Community 688"
Cohesion: 1.0
Nodes (0): 

### Community 689 - "Community 689"
Cohesion: 1.0
Nodes (0): 

### Community 690 - "Community 690"
Cohesion: 1.0
Nodes (0): 

### Community 691 - "Community 691"
Cohesion: 1.0
Nodes (0): 

### Community 692 - "Community 692"
Cohesion: 1.0
Nodes (0): 

### Community 693 - "Community 693"
Cohesion: 1.0
Nodes (0): 

### Community 694 - "Community 694"
Cohesion: 1.0
Nodes (0): 

### Community 695 - "Community 695"
Cohesion: 1.0
Nodes (0): 

### Community 696 - "Community 696"
Cohesion: 1.0
Nodes (0): 

### Community 697 - "Community 697"
Cohesion: 1.0
Nodes (0): 

### Community 698 - "Community 698"
Cohesion: 1.0
Nodes (0): 

### Community 699 - "Community 699"
Cohesion: 1.0
Nodes (0): 

### Community 700 - "Community 700"
Cohesion: 1.0
Nodes (0): 

### Community 701 - "Community 701"
Cohesion: 1.0
Nodes (0): 

### Community 702 - "Community 702"
Cohesion: 1.0
Nodes (0): 

### Community 703 - "Community 703"
Cohesion: 1.0
Nodes (0): 

### Community 704 - "Community 704"
Cohesion: 1.0
Nodes (0): 

### Community 705 - "Community 705"
Cohesion: 1.0
Nodes (0): 

### Community 706 - "Community 706"
Cohesion: 1.0
Nodes (0): 

### Community 707 - "Community 707"
Cohesion: 1.0
Nodes (0): 

### Community 708 - "Community 708"
Cohesion: 1.0
Nodes (0): 

### Community 709 - "Community 709"
Cohesion: 1.0
Nodes (0): 

### Community 710 - "Community 710"
Cohesion: 1.0
Nodes (0): 

### Community 711 - "Community 711"
Cohesion: 1.0
Nodes (0): 

### Community 712 - "Community 712"
Cohesion: 1.0
Nodes (0): 

### Community 713 - "Community 713"
Cohesion: 1.0
Nodes (0): 

### Community 714 - "Community 714"
Cohesion: 1.0
Nodes (0): 

### Community 715 - "Community 715"
Cohesion: 1.0
Nodes (0): 

### Community 716 - "Community 716"
Cohesion: 1.0
Nodes (0): 

### Community 717 - "Community 717"
Cohesion: 1.0
Nodes (0): 

### Community 718 - "Community 718"
Cohesion: 1.0
Nodes (0): 

### Community 719 - "Community 719"
Cohesion: 1.0
Nodes (0): 

### Community 720 - "Community 720"
Cohesion: 1.0
Nodes (0): 

### Community 721 - "Community 721"
Cohesion: 1.0
Nodes (0): 

### Community 722 - "Community 722"
Cohesion: 1.0
Nodes (0): 

### Community 723 - "Community 723"
Cohesion: 1.0
Nodes (0): 

### Community 724 - "Community 724"
Cohesion: 1.0
Nodes (0): 

### Community 725 - "Community 725"
Cohesion: 1.0
Nodes (0): 

### Community 726 - "Community 726"
Cohesion: 1.0
Nodes (0): 

### Community 727 - "Community 727"
Cohesion: 1.0
Nodes (0): 

### Community 728 - "Community 728"
Cohesion: 1.0
Nodes (0): 

### Community 729 - "Community 729"
Cohesion: 1.0
Nodes (0): 

### Community 730 - "Community 730"
Cohesion: 1.0
Nodes (0): 

### Community 731 - "Community 731"
Cohesion: 1.0
Nodes (0): 

### Community 732 - "Community 732"
Cohesion: 1.0
Nodes (0): 

### Community 733 - "Community 733"
Cohesion: 1.0
Nodes (0): 

### Community 734 - "Community 734"
Cohesion: 1.0
Nodes (0): 

### Community 735 - "Community 735"
Cohesion: 1.0
Nodes (0): 

### Community 736 - "Community 736"
Cohesion: 1.0
Nodes (0): 

### Community 737 - "Community 737"
Cohesion: 1.0
Nodes (0): 

### Community 738 - "Community 738"
Cohesion: 1.0
Nodes (0): 

### Community 739 - "Community 739"
Cohesion: 1.0
Nodes (0): 

### Community 740 - "Community 740"
Cohesion: 1.0
Nodes (0): 

### Community 741 - "Community 741"
Cohesion: 1.0
Nodes (0): 

### Community 742 - "Community 742"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **353 isolated node(s):** `ClientCredentialsProvider`, `PrivateKeyJwtProvider`, `StaticPrivateKeyJwtProvider`, `UnauthorizedError`, `Client` (+348 more)
  These have ¡Ü1 connection - possible missing edges or undocumented components.
- **Thin community `Community 188`** (2 nodes): `auth.d.ts`, `UnauthorizedError`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 189`** (2 nodes): `websocket.d.ts`, `WebSocketClientTransport`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 190`** (2 nodes): `simpleOAuthClientProvider.d.ts`, `InMemoryOAuthClientProvider`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 191`** (2 nodes): `ssePollingClient.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 192`** (2 nodes): `honoWebStandardStreamableHttp.js`, `getServer()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 193`** (2 nodes): `jsonResponseStreamableHttp.js`, `getServer()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 194`** (2 nodes): `mcpServerOutputSchema.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 195`** (2 nodes): `progressExample.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 196`** (2 nodes): `simpleSseServer.js`, `getServer()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 197`** (2 nodes): `simpleStatelessStreamableHttp.js`, `getServer()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 198`** (2 nodes): `sseAndStreamableHttpCompatibleServer.js`, `getServer()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 199`** (2 nodes): `ssePollingExample.js`, `getServer()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 200`** (2 nodes): `standaloneSseWithGetStreamableHttp.js`, `getServer()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 201`** (2 nodes): `toolWithSampleServer.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 202`** (2 nodes): `inMemoryEventStore.d.ts`, `InMemoryEventStore`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 203`** (2 nodes): `client.d.ts`, `ExperimentalClientTasks`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 204`** (2 nodes): `interfaces.js`, `isTerminal()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 205`** (2 nodes): `mcp-server.d.ts`, `ExperimentalMcpServerTasks`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 206`** (2 nodes): `server.d.ts`, `ExperimentalServerTasks`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 207`** (2 nodes): `inMemory.d.ts`, `InMemoryTransport`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 208`** (2 nodes): `allowedMethods.js`, `allowedMethods()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 209`** (2 nodes): `bearerAuth.js`, `requireBearerAuth()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 210`** (2 nodes): `clientAuth.js`, `authenticateClient()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 211`** (2 nodes): `webStandardStreamableHttp.d.ts`, `WebStandardStreamableHTTPServerTransport`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 212`** (2 nodes): `metadataUtils.js`, `getDisplayName()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 213`** (2 nodes): `uriTemplate.d.ts`, `UriTemplate`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 214`** (2 nodes): `ajv-provider.d.ts`, `AjvJsonSchemaValidator`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 215`** (2 nodes): `cfworker-provider.d.ts`, `CfWorkerJsonSchemaValidator`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 216`** (2 nodes): `example.js`, `ExamplePlugin()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 217`** (2 nodes): `tool.js`, `tool()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 218`** (2 nodes): `client.gen.js`, `createClient()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 219`** (2 nodes): `utils.gen.d.ts`, `Interceptors`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 220`** (2 nodes): `auth.gen.js`, `getAuthToken()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 221`** (2 nodes): `serverSentEvents.gen.js`, `createSseClient()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 222`** (2 nodes): `child_process.d.ts`, `ChildProcess`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 223`** (2 nodes): `cluster.d.ts`, `Worker`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 224`** (2 nodes): `dgram.d.ts`, `Socket`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 225`** (2 nodes): `dns.d.ts`, `Resolver`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 226`** (2 nodes): `domain.d.ts`, `Domain`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 227`** (2 nodes): `inspector.d.ts`, `Session`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 228`** (2 nodes): `readline.d.ts`, `Interface`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 229`** (2 nodes): `string_decoder.d.ts`, `StringDecoder`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 230`** (2 nodes): `wasi.d.ts`, `WASI`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 231`** (2 nodes): `database.js`, `Database()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 232`** (2 nodes): `backup.js`, `runBackup()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 233`** (2 nodes): `sqlite-error.js`, `SqliteError()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 234`** (2 nodes): `_commonjsHelpers.BFTU3MAI.js`, `getDefaultExportFromCjs()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 235`** (2 nodes): `coverage.DVF1vEu8.js`, `resolveCoverageProviderModule()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 236`** (2 nodes): `snapshot.d.ts`, `VitestNodeSnapshotEnvironment`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 237`** (2 nodes): `base.test.ts`, `callback()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 238`** (2 nodes): `branded.test.ts`, `doStuff()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 239`** (2 nodes): `error.test.ts`, `errorMap()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 240`** (2 nodes): `function.test.ts`, `checker()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 241`** (2 nodes): `nullable.test.ts`, `checkErrors()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 242`** (2 nodes): `object-augmentation.test.ts`, `bad()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 243`** (2 nodes): `optional.test.ts`, `checkErrors()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 244`** (2 nodes): `primitive.test.ts`, `f()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 245`** (2 nodes): `promise.test.ts`, `bad()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 246`** (2 nodes): `record.test.ts`, `badCheck()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 247`** (2 nodes): `string.test.ts`, `makeJwt()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 248`** (2 nodes): `tuple.test.ts`, `checker()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 249`** (2 nodes): `checks.js`, `handleCheckPropertyResult()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 250`** (2 nodes): `assignability.test.ts`, `createSortItemSchema()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 251`** (2 nodes): `brand.test.ts`, `doStuff()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 252`** (2 nodes): `custom.test.ts`, `fn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 253`** (2 nodes): `to-json-schema.test.ts`, `override()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 254`** (2 nodes): `ar.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 255`** (2 nodes): `az.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 256`** (2 nodes): `ca.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 257`** (2 nodes): `cs.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 258`** (2 nodes): `de.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 259`** (2 nodes): `es.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 260`** (2 nodes): `fa.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 261`** (2 nodes): `fi.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 262`** (2 nodes): `fr-CA.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 263`** (2 nodes): `fr.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 264`** (2 nodes): `he.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 265`** (2 nodes): `hu.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 266`** (2 nodes): `id.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 267`** (2 nodes): `it.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 268`** (2 nodes): `ja.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 269`** (2 nodes): `kh.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 270`** (2 nodes): `ko.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 271`** (2 nodes): `mk.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 272`** (2 nodes): `ms.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 273`** (2 nodes): `nl.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 274`** (2 nodes): `no.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 275`** (2 nodes): `ota.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 276`** (2 nodes): `pl.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 277`** (2 nodes): `ps.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 278`** (2 nodes): `pt.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 279`** (2 nodes): `sl.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 280`** (2 nodes): `sv.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 281`** (2 nodes): `ta.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 282`** (2 nodes): `th.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 283`** (2 nodes): `ua.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 284`** (2 nodes): `ur.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 285`** (2 nodes): `vi.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 286`** (2 nodes): `zh-CN.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 287`** (2 nodes): `zh-TW.js`, `error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 288`** (2 nodes): `parseUtil.d.ts`, `ParseStatus`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 289`** (2 nodes): `ZodError.d.ts`, `ZodError`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 290`** (2 nodes): `core.d.ts`, `$ZodAsyncError`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 291`** (2 nodes): `doc.d.ts`, `Doc`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 292`** (2 nodes): `function.d.ts`, `$ZodFunction`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 293`** (2 nodes): `registries.d.ts`, `$ZodRegistry`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 294`** (2 nodes): `to-json-schema.d.ts`, `JSONSchemaGenerator`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 295`** (2 nodes): `cancel-task.ts`, `createCancelTaskHandler()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 296`** (2 nodes): `get-task.ts`, `createGetTaskHandler()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 297`** (2 nodes): `send-message-stream.ts`, `createSendMessageStreamHandler()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 298`** (2 nodes): `host.d.ts`, `A2ARelayHost`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 299`** (2 nodes): `inbound-request.ts`, `mapSendMessageRequest()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 300`** (2 nodes): `outbound-events.d.ts`, `TaskEventHub`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 301`** (2 nodes): `task-resource.ts`, `createTaskResource()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 302`** (2 nodes): `relay-replay.ts`, `createRelayReplayTool()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 303`** (2 nodes): `relay-status.ts`, `createRelayStatusTool()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 304`** (2 nodes): `relay-room-orchestrator.d.ts`, `RelayRoomOrchestrator`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 305`** (2 nodes): `audit-store.d.ts`, `AuditStore`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 306`** (2 nodes): `message-store.d.ts`, `MessageStore`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 307`** (2 nodes): `room-store.d.ts`, `RoomStore`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 308`** (2 nodes): `schema.ts`, `initializeRelaySchema()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 309`** (2 nodes): `session-link-store.d.ts`, `SessionLinkStore`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 310`** (2 nodes): `task-store.d.ts`, `TaskStore`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 311`** (2 nodes): `team-store.d.ts`, `TeamStore`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 312`** (2 nodes): `thread-store.d.ts`, `ThreadStore`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 313`** (2 nodes): `relay-mcp-stdio.ts`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 314`** (2 nodes): `compaction-anchor.ts`, `buildCompactionContext()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 315`** (2 nodes): `delivery-gate.ts`, `evaluateDelivery()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 316`** (2 nodes): `human-guard.d.ts`, `HumanGuard`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 317`** (2 nodes): `injector.d.ts`, `SessionInjector`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 318`** (2 nodes): `loop-guard.d.ts`, `LoopGuard`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 319`** (2 nodes): `plugin-state.ts`, `createRelayPluginState()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 320`** (2 nodes): `relay-runtime.d.ts`, `RelayRuntime`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 321`** (2 nodes): `response-observer.d.ts`, `ResponseObserver`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 322`** (2 nodes): `session-registry.d.ts`, `SessionRegistry`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 323`** (2 nodes): `logger.ts`, `createLogRecord()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 324`** (2 nodes): `bootstrap.test.ts`, `createPluginInput()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 325`** (2 nodes): `dispatch-failure.test.ts`, `createPluginInput()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 326`** (2 nodes): `mcp-first-hooks.test.ts`, `createPluginInput()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 327`** (2 nodes): `mcp-group-room.test.ts`, `createPluginInput()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 328`** (2 nodes): `message-notification-window.test.ts`, `createPluginInput()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 329`** (2 nodes): `message-queue.test.ts`, `createPluginInput()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 330`** (2 nodes): `message-tools.test.ts`, `createPluginInput()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 331`** (2 nodes): `replay-runtime.test.ts`, `createPluginInput()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 332`** (2 nodes): `room-tools.test.ts`, `createPluginInput()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 333`** (2 nodes): `send-message.test.ts`, `createRequest()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 334`** (2 nodes): `team-governance.test.ts`, `createPluginInput()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 335`** (2 nodes): `team-start.test.ts`, `createPluginInput()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 336`** (2 nodes): `team-status.test.ts`, `createPluginInput()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 337`** (1 nodes): `middleware.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 338`** (1 nodes): `elicitationUrlExample.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 339`** (1 nodes): `multipleClientsParallel.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 340`** (1 nodes): `parallelToolCallsClient.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 341`** (1 nodes): `simpleClientCredentials.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 342`** (1 nodes): `simpleOAuthClient.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 343`** (1 nodes): `simpleStreamableHttp.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 344`** (1 nodes): `simpleTaskInteractiveClient.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 345`** (1 nodes): `ssePollingClient.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 346`** (1 nodes): `streamableHttpWithSseFallbackClient.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 347`** (1 nodes): `elicitationFormExample.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 348`** (1 nodes): `honoWebStandardStreamableHttp.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 349`** (1 nodes): `jsonResponseStreamableHttp.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 350`** (1 nodes): `mcpServerOutputSchema.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 351`** (1 nodes): `progressExample.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 352`** (1 nodes): `simpleSseServer.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 353`** (1 nodes): `simpleStatelessStreamableHttp.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 354`** (1 nodes): `simpleTaskInteractive.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 355`** (1 nodes): `sseAndStreamableHttpCompatibleServer.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 356`** (1 nodes): `ssePollingExample.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 357`** (1 nodes): `standaloneSseWithGetStreamableHttp.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 358`** (1 nodes): `toolWithSampleServer.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 359`** (1 nodes): `helpers.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 360`** (1 nodes): `interfaces.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 361`** (1 nodes): `clients.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 362`** (1 nodes): `clients.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 363`** (1 nodes): `provider.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 364`** (1 nodes): `completable.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 365`** (1 nodes): `zod-json-schema-compat.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 366`** (1 nodes): `auth-utils.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 367`** (1 nodes): `metadataUtils.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 368`** (1 nodes): `protocol.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 369`** (1 nodes): `responseMessage.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 370`** (1 nodes): `toolNameValidation.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 371`** (1 nodes): `transport.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 372`** (1 nodes): `spec.types.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 373`** (1 nodes): `spec.types.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 374`** (1 nodes): `example.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 375`** (1 nodes): `shell.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 376`** (1 nodes): `shell.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 377`** (1 nodes): `tool.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 378`** (1 nodes): `tui.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 379`** (1 nodes): `client.gen.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 380`** (1 nodes): `types.gen.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 381`** (1 nodes): `types.gen.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 382`** (1 nodes): `auth.gen.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 383`** (1 nodes): `bodySerializer.gen.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 384`** (1 nodes): `params.gen.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 385`** (1 nodes): `pathSerializer.gen.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 386`** (1 nodes): `queryKeySerializer.gen.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 387`** (1 nodes): `serverSentEvents.gen.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 388`** (1 nodes): `strict.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 389`** (1 nodes): `buffer.buffer.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 390`** (1 nodes): `disposable.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 391`** (1 nodes): `indexable.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 392`** (1 nodes): `iterators.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 393`** (1 nodes): `console.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 394`** (1 nodes): `constants.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 395`** (1 nodes): `globals.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 396`** (1 nodes): `globals.typedarray.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 397`** (1 nodes): `inspector.generated.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 398`** (1 nodes): `os.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 399`** (1 nodes): `path.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 400`** (1 nodes): `process.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 401`** (1 nodes): `punycode.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 402`** (1 nodes): `querystring.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 403`** (1 nodes): `sea.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 404`** (1 nodes): `consumers.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 405`** (1 nodes): `web.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 406`** (1 nodes): `timers.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 407`** (1 nodes): `trace_events.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 408`** (1 nodes): `abortcontroller.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 409`** (1 nodes): `domexception.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 410`** (1 nodes): `fetch.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 411`** (1 nodes): `navigator.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 412`** (1 nodes): `storage.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 413`** (1 nodes): `copy.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 414`** (1 nodes): `inspect.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 415`** (1 nodes): `pragma.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 416`** (1 nodes): `serialize.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 417`** (1 nodes): `wrappers.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 418`** (1 nodes): `lib.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 419`** (1 nodes): `lib.decorators.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 420`** (1 nodes): `lib.decorators.legacy.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 421`** (1 nodes): `lib.dom.asynciterable.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 422`** (1 nodes): `lib.dom.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 423`** (1 nodes): `lib.dom.iterable.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 424`** (1 nodes): `lib.es2015.collection.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 425`** (1 nodes): `lib.es2015.core.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 426`** (1 nodes): `lib.es2015.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 427`** (1 nodes): `lib.es2015.generator.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 428`** (1 nodes): `lib.es2015.iterable.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 429`** (1 nodes): `lib.es2015.promise.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 430`** (1 nodes): `lib.es2015.proxy.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 431`** (1 nodes): `lib.es2015.reflect.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 432`** (1 nodes): `lib.es2015.symbol.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 433`** (1 nodes): `lib.es2015.symbol.wellknown.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 434`** (1 nodes): `lib.es2016.array.include.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 435`** (1 nodes): `lib.es2016.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 436`** (1 nodes): `lib.es2016.full.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 437`** (1 nodes): `lib.es2016.intl.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 438`** (1 nodes): `lib.es2017.arraybuffer.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 439`** (1 nodes): `lib.es2017.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 440`** (1 nodes): `lib.es2017.date.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 441`** (1 nodes): `lib.es2017.full.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 442`** (1 nodes): `lib.es2017.intl.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 443`** (1 nodes): `lib.es2017.object.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 444`** (1 nodes): `lib.es2017.sharedmemory.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 445`** (1 nodes): `lib.es2017.string.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 446`** (1 nodes): `lib.es2017.typedarrays.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 447`** (1 nodes): `lib.es2018.asyncgenerator.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 448`** (1 nodes): `lib.es2018.asynciterable.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 449`** (1 nodes): `lib.es2018.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 450`** (1 nodes): `lib.es2018.full.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 451`** (1 nodes): `lib.es2018.intl.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 452`** (1 nodes): `lib.es2018.promise.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 453`** (1 nodes): `lib.es2018.regexp.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 454`** (1 nodes): `lib.es2019.array.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 455`** (1 nodes): `lib.es2019.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 456`** (1 nodes): `lib.es2019.full.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 457`** (1 nodes): `lib.es2019.intl.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 458`** (1 nodes): `lib.es2019.object.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 459`** (1 nodes): `lib.es2019.string.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 460`** (1 nodes): `lib.es2019.symbol.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 461`** (1 nodes): `lib.es2020.bigint.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 462`** (1 nodes): `lib.es2020.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 463`** (1 nodes): `lib.es2020.date.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 464`** (1 nodes): `lib.es2020.full.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 465`** (1 nodes): `lib.es2020.intl.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 466`** (1 nodes): `lib.es2020.number.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 467`** (1 nodes): `lib.es2020.promise.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 468`** (1 nodes): `lib.es2020.sharedmemory.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 469`** (1 nodes): `lib.es2020.string.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 470`** (1 nodes): `lib.es2020.symbol.wellknown.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 471`** (1 nodes): `lib.es2021.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 472`** (1 nodes): `lib.es2021.full.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 473`** (1 nodes): `lib.es2021.intl.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 474`** (1 nodes): `lib.es2021.promise.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 475`** (1 nodes): `lib.es2021.string.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 476`** (1 nodes): `lib.es2021.weakref.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 477`** (1 nodes): `lib.es2022.array.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 478`** (1 nodes): `lib.es2022.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 479`** (1 nodes): `lib.es2022.error.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 480`** (1 nodes): `lib.es2022.full.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 481`** (1 nodes): `lib.es2022.intl.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 482`** (1 nodes): `lib.es2022.object.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 483`** (1 nodes): `lib.es2022.regexp.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 484`** (1 nodes): `lib.es2022.string.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 485`** (1 nodes): `lib.es2023.array.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 486`** (1 nodes): `lib.es2023.collection.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 487`** (1 nodes): `lib.es2023.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 488`** (1 nodes): `lib.es2023.full.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 489`** (1 nodes): `lib.es2023.intl.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 490`** (1 nodes): `lib.es2024.arraybuffer.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 491`** (1 nodes): `lib.es2024.collection.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 492`** (1 nodes): `lib.es2024.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 493`** (1 nodes): `lib.es2024.full.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 494`** (1 nodes): `lib.es2024.object.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 495`** (1 nodes): `lib.es2024.promise.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 496`** (1 nodes): `lib.es2024.regexp.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 497`** (1 nodes): `lib.es2024.sharedmemory.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 498`** (1 nodes): `lib.es2024.string.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 499`** (1 nodes): `lib.es5.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 500`** (1 nodes): `lib.es6.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 501`** (1 nodes): `lib.esnext.array.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 502`** (1 nodes): `lib.esnext.collection.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 503`** (1 nodes): `lib.esnext.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 504`** (1 nodes): `lib.esnext.decorators.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 505`** (1 nodes): `lib.esnext.disposable.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 506`** (1 nodes): `lib.esnext.error.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 507`** (1 nodes): `lib.esnext.float16.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 508`** (1 nodes): `lib.esnext.full.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 509`** (1 nodes): `lib.esnext.intl.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 510`** (1 nodes): `lib.esnext.iterator.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 511`** (1 nodes): `lib.esnext.promise.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 512`** (1 nodes): `lib.esnext.sharedmemory.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 513`** (1 nodes): `lib.webworker.asynciterable.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 514`** (1 nodes): `lib.webworker.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 515`** (1 nodes): `lib.webworker.importscripts.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 516`** (1 nodes): `lib.webworker.iterable.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 517`** (1 nodes): `tsserverlibrary.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 518`** (1 nodes): `tsserverlibrary.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 519`** (1 nodes): `watchGuard.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 520`** (1 nodes): `benchmark.d.BwvBVTda.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 521`** (1 nodes): `constants.DnKduX2e.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 522`** (1 nodes): `defaults.B7q_naMc.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 523`** (1 nodes): `env.D4Lgay0q.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 524`** (1 nodes): `environment.d.cL3nLXbE.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 525`** (1 nodes): `index.CdQS2e2Q.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 526`** (1 nodes): `suite.d.FvehnV49.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 527`** (1 nodes): `vite.d.CMLlLIFP.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 528`** (1 nodes): `worker.d.CKwWzBSj.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 529`** (1 nodes): `coverage.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 530`** (1 nodes): `environments.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 531`** (1 nodes): `environments.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 532`** (1 nodes): `mocker.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 533`** (1 nodes): `path.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 534`** (1 nodes): `reporters.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 535`** (1 nodes): `suite.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 536`** (1 nodes): `suite.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 537`** (1 nodes): `import-meta.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 538`** (1 nodes): `importMeta.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 539`** (1 nodes): `jsdom.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 540`** (1 nodes): `optional-types.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 541`** (1 nodes): `utils.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 542`** (1 nodes): `datetime.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 543`** (1 nodes): `discriminatedUnion.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 544`** (1 nodes): `ipv4.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 545`** (1 nodes): `object.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 546`** (1 nodes): `primitives.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 547`** (1 nodes): `union.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 548`** (1 nodes): `external.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 549`** (1 nodes): `enumUtil.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 550`** (1 nodes): `partialUtil.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 551`** (1 nodes): `typeAliases.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 552`** (1 nodes): `standard-schema.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 553`** (1 nodes): `all-errors.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 554`** (1 nodes): `anyunknown.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 555`** (1 nodes): `array.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 556`** (1 nodes): `async-refinements.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 557`** (1 nodes): `bigint.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 558`** (1 nodes): `coerce.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 559`** (1 nodes): `complex.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 560`** (1 nodes): `date.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 561`** (1 nodes): `deepmasking.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 562`** (1 nodes): `default.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 563`** (1 nodes): `description.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 564`** (1 nodes): `discriminated-unions.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 565`** (1 nodes): `enum.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 566`** (1 nodes): `firstpartyschematypes.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 567`** (1 nodes): `language-server.source.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 568`** (1 nodes): `language-server.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 569`** (1 nodes): `literal.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 570`** (1 nodes): `map.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 571`** (1 nodes): `masking.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 572`** (1 nodes): `mocker.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 573`** (1 nodes): `nan.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 574`** (1 nodes): `nativeEnum.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 575`** (1 nodes): `number.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 576`** (1 nodes): `object-in-es5-env.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 577`** (1 nodes): `parser.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 578`** (1 nodes): `parseUtil.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 579`** (1 nodes): `partials.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 580`** (1 nodes): `pipeline.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 581`** (1 nodes): `preprocess.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 582`** (1 nodes): `readonly.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 583`** (1 nodes): `recursive.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 584`** (1 nodes): `refine.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 585`** (1 nodes): `safeparse.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 586`** (1 nodes): `set.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 587`** (1 nodes): `standard-schema.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 588`** (1 nodes): `transformer.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 589`** (1 nodes): `unions.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 590`** (1 nodes): `validations.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 591`** (1 nodes): `void.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 592`** (1 nodes): `coalesce.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 593`** (1 nodes): `continuability.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 594`** (1 nodes): `datetime.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 595`** (1 nodes): `error-utils.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 596`** (1 nodes): `file.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 597`** (1 nodes): `json.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 598`** (1 nodes): `lazy.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 599`** (1 nodes): `nested-refine.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 600`** (1 nodes): `nonoptional.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 601`** (1 nodes): `partial.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 602`** (1 nodes): `pipe.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 603`** (1 nodes): `prefault.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 604`** (1 nodes): `prototypes.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 605`** (1 nodes): `recursive-types.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 606`** (1 nodes): `registries.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 607`** (1 nodes): `string-formats.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 608`** (1 nodes): `stringbool.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 609`** (1 nodes): `template-literal.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 610`** (1 nodes): `transform.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 611`** (1 nodes): `union.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 612`** (1 nodes): `be.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 613`** (1 nodes): `en.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 614`** (1 nodes): `ru.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 615`** (1 nodes): `tr.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 616`** (1 nodes): `versions.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 617`** (1 nodes): `zsf.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 618`** (1 nodes): `checks.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 619`** (1 nodes): `functions.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 620`** (1 nodes): `external.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 621`** (1 nodes): `enumUtil.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 622`** (1 nodes): `errorUtil.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 623`** (1 nodes): `partialUtil.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 624`** (1 nodes): `typeAliases.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 625`** (1 nodes): `en.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 626`** (1 nodes): `standard-schema.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 627`** (1 nodes): `checks.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 628`** (1 nodes): `coerce.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 629`** (1 nodes): `compat.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 630`** (1 nodes): `iso.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 631`** (1 nodes): `parse.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 632`** (1 nodes): `schemas.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 633`** (1 nodes): `api.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 634`** (1 nodes): `json-schema.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 635`** (1 nodes): `regexes.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 636`** (1 nodes): `versions.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 637`** (1 nodes): `ar.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 638`** (1 nodes): `az.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 639`** (1 nodes): `be.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 640`** (1 nodes): `ca.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 641`** (1 nodes): `cs.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 642`** (1 nodes): `de.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 643`** (1 nodes): `eo.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 644`** (1 nodes): `es.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 645`** (1 nodes): `fa.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 646`** (1 nodes): `fi.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 647`** (1 nodes): `fr-CA.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 648`** (1 nodes): `fr.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 649`** (1 nodes): `he.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 650`** (1 nodes): `hu.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 651`** (1 nodes): `id.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 652`** (1 nodes): `it.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 653`** (1 nodes): `ja.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 654`** (1 nodes): `kh.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 655`** (1 nodes): `ko.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 656`** (1 nodes): `mk.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 657`** (1 nodes): `ms.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 658`** (1 nodes): `nl.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 659`** (1 nodes): `no.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 660`** (1 nodes): `ota.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 661`** (1 nodes): `pl.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 662`** (1 nodes): `ps.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 663`** (1 nodes): `pt.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 664`** (1 nodes): `ru.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 665`** (1 nodes): `sl.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 666`** (1 nodes): `sv.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 667`** (1 nodes): `ta.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 668`** (1 nodes): `th.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 669`** (1 nodes): `tr.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 670`** (1 nodes): `ua.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 671`** (1 nodes): `ur.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 672`** (1 nodes): `vi.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 673`** (1 nodes): `zh-CN.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 674`** (1 nodes): `zh-TW.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 675`** (1 nodes): `agent-card.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 676`** (1 nodes): `extensions.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 677`** (1 nodes): `extensions.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 678`** (1 nodes): `ids.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 679`** (1 nodes): `jsonrpc.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 680`** (1 nodes): `jsonrpc.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 681`** (1 nodes): `message.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 682`** (1 nodes): `message.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 683`** (1 nodes): `security.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 684`** (1 nodes): `security.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 685`** (1 nodes): `task.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 686`** (1 nodes): `task.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 687`** (1 nodes): `cancel-task.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 688`** (1 nodes): `get-task.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 689`** (1 nodes): `send-message-stream.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 690`** (1 nodes): `send-message.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 691`** (1 nodes): `inbound-request.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 692`** (1 nodes): `task-resource.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 693`** (1 nodes): `relay-replay.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 694`** (1 nodes): `relay-status.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 695`** (1 nodes): `schema.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 696`** (1 nodes): `state-access.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 697`** (1 nodes): `local-plugin.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 698`** (1 nodes): `local-plugin.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 699`** (1 nodes): `relay-mcp-server.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 700`** (1 nodes): `relay-mcp-stdio.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 701`** (1 nodes): `compaction-anchor.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 702`** (1 nodes): `delivery-gate.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 703`** (1 nodes): `plugin-instance-registry.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 704`** (1 nodes): `plugin-state.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 705`** (1 nodes): `prompt-preamble.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 706`** (1 nodes): `team-workflow.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 707`** (1 nodes): `session-id.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 708`** (1 nodes): `logger.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 709`** (1 nodes): `result.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 710`** (1 nodes): `time.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 711`** (1 nodes): `a2a-happy-path.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 712`** (1 nodes): `duplicate-suppression.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 713`** (1 nodes): `human-interrupt.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 714`** (1 nodes): `replay-flow.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 715`** (1 nodes): `restart-recovery.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 716`** (1 nodes): `smoke.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 717`** (1 nodes): `streaming-status.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 718`** (1 nodes): `a2a-host.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 719`** (1 nodes): `agent-card.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 720`** (1 nodes): `config-path.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 721`** (1 nodes): `delivery-gate.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 722`** (1 nodes): `human-guard.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 723`** (1 nodes): `internal-mcp.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 724`** (1 nodes): `local-plugin-entry.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 725`** (1 nodes): `loop-guard.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 726`** (1 nodes): `package-manifest.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 727`** (1 nodes): `package-surface.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 728`** (1 nodes): `prompt-preamble.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 729`** (1 nodes): `relay-mcp-room-coexistence.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 730`** (1 nodes): `relay-mcp-server.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 731`** (1 nodes): `relay-orchestration.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 732`** (1 nodes): `response-observer.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 733`** (1 nodes): `room-store.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 734`** (1 nodes): `send-message-stream.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 735`** (1 nodes): `session-id.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 736`** (1 nodes): `store.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 737`** (1 nodes): `task-store-rules.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 738`** (1 nodes): `team-store.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 739`** (1 nodes): `thread-message-store.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 740`** (1 nodes): `jsonrpc.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 741`** (1 nodes): `task-model.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 742`** (1 nodes): `relay-plugin-testkit.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 427 inferred relationships involving `sqlite3_free()` (e.g. with `sqlite3OsOpenMalloc()` and `sqlite3OsCloseFree()`) actually correct?**
  _`sqlite3_free()` has 427 INFERRED edges - model-reasoned connections that need verification._
- **Are the 249 inferred relationships involving `push()` (e.g. with `zipWith()` and `intersperse()`) actually correct?**
  _`push()` has 249 INFERRED edges - model-reasoned connections that need verification._
- **Are the 226 inferred relationships involving `assert()` (e.g. with `first()` and `last()`) actually correct?**
  _`assert()` has 226 INFERRED edges - model-reasoned connections that need verification._
- **Are the 186 inferred relationships involving `map()` (e.g. with `push()` and `indicesOf()`) actually correct?**
  _`map()` has 186 INFERRED edges - model-reasoned connections that need verification._
- **Are the 184 inferred relationships involving `sqlite3VdbeExec()` (e.g. with `sqlite3Step()` and `sqlite3VdbeEnter()`) actually correct?**
  _`sqlite3VdbeExec()` has 184 INFERRED edges - model-reasoned connections that need verification._
- **What connects `ClientCredentialsProvider`, `PrivateKeyJwtProvider`, `StaticPrivateKeyJwtProvider` to the rest of the system?**
  _353 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.0 - nodes in this community are weakly interconnected._